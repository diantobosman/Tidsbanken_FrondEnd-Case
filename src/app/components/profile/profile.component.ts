import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProfileChangeProfileDialogComponent } from '../profile-change-profile-dialog/profile-change-profile-dialog.component';
import {ThemePalette} from '@angular/material/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { StorageUtil } from 'src/app/utils/storage.util';
import { FunctionUtil } from 'src/app/utils/functions.util';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {
  //-- Toggle button
  color: ThemePalette = 'accent';
  public adminOn: boolean = false;
  public adminOff: boolean = false;
  public admin: boolean = StorageUtil.storageRead<Employee>(StorageKeys.Employee)!.admin

  disabled = false;

  constructor(
    private readonly employeeService: EmployeeService,
    public dialog: MatDialog,
    private readonly http: HttpClient
  ) { }

   get employee(): Employee | undefined {
    return this.employeeService.employee;
  }

  openDialogChangeProfileDetails() {
    this.dialog.open(ProfileChangeProfileDialogComponent);
  }

  toggleButton() {

    this.admin = FunctionUtil.toggleBoolean(this.admin)
    this.changeAdminRightsAPI(this.admin)
    this.changeAdminRightsKeyCloak(this.admin)
  }

  changeAdminRightsKeyCloak(bool: boolean) {
    // Get the mastertoken
    const masterToken = StorageUtil.storageRead(StorageKeys.AuthKeyMaster)
    const user = StorageUtil.storageRead<User>(StorageKeys.User) //-- Should this not be the employee?
    
    const id = user?.id
    const username = user?.username
    const groupId = "a045b089-8caa-4c96-83f0-ef77243cbd9c"
    //-- Define the headers
    const headers = new HttpHeaders ({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${masterToken}`
    })

    var body = {
      "username": username,
      "groups": [ "admin" ]
    }
    
    //-- Post the new user
    return this.http.put<any>(environment.herokuURL + `auth/admin/realms/tidsbankencase/users/` + id + `/groups/` + groupId, {headers} )
    .subscribe({
      next: (result) => {
        console.log(result)
      },
      error: (error) => {
      console.log(error)
      }
    })
  }





  changeAdminRightsAPI(bool: boolean) {
    console.log("Function is correctly called")
    console.log(bool)
    const id = this.employeeService.employee?.employeeId

    // Get the mastertoken
    const employeeToken = StorageUtil.storageRead(StorageKeys.AuthKey)

    //-- Define the headers
    const headers = new HttpHeaders ({
      "accept": "*/*",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${employeeToken}`
      })

    var body = {
      "employeeId": id,
      "first_name": this.employeeService.employee?.first_name,
      "last_name": this.employeeService.employee?.last_name,
      "emailAddress": this.employeeService?.employee?.emailAddress,
      "admin": bool
    }

    return this.http.patch<any>(environment.APIURL + `employee/update/` + id , body, {headers})
    .subscribe({
      next: (result) => {

        this.employee!.admin = this.admin
        StorageUtil.storageSave(StorageKeys.Employee, this.employee)

        if(this.admin === true){
          this.adminOn = false
          this.adminOff = true
        }
        else{
          this.adminOff = false
          this.adminOn = true
        }

      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
