import { Component, OnInit } from '@angular/core';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { StorageUtil } from '../../utils/storage.util';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ThemePalette } from '@angular/material/core';
import { Employee } from 'src/app/models/employee.model';
import { FunctionUtil } from 'src/app/utils/functions.util';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ViewAllUsersEditDialogComponent } from '../view-all-users-edit-dialog/view-all-users-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view-all-users',
  templateUrl: './view-all-users.component.html',
  styleUrls: ['./view-all-users.component.css']
})

export class ViewAllUsersComponent implements OnInit {
  public _allFirstNamesOfEmployee: string | undefined

  //-- Toggle button
  color: ThemePalette = 'accent';
  public adminOn: boolean = false;
  public adminOff: boolean = false;
  public allEmployees: any;
  public selectedEmployee: any;

  constructor(
    private readonly http: HttpClient,
    private readonly userService: UserService,
    private readonly employeeService: EmployeeService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.fetchAllEmployees()
    this.filterForFirstNames()
  }
  
  //-- Getter
  get employee(): Employee | undefined {
    return this.employeeService.employee;
  }

  //-- Functions
  public filterForFirstNames() {
    this.allEmployees  = StorageUtil.storageRead<any>(StorageKeys.Employees)
    const allIdOfEmployees = this.allEmployees.map((element: { employeeId: any; }) => element.employeeId)
    this._allFirstNamesOfEmployee = this.allEmployees.map((element: { first_name: any; }) => element.first_name)
    const allLastNamesofEmployees = this.allEmployees.map((element: { last_name: any; }) => element.last_name)
  
  }

  public giveAdminButton(selectedEmployeeName: string) {

    this.selectedEmployee = this.allEmployees.find((x: { first_name: string; }) => x.first_name === selectedEmployeeName);

    console.log(this.selectedEmployee)

    this.changeAdminRightsAPI(true)
    //this.changeAdminRightsKeyCloak(this.admin)
  }

  public revokeAdminButton(selectedEmployeeName: string) {

    this.selectedEmployee = this.allEmployees.find((x: { first_name: string; }) => x.first_name === selectedEmployeeName);

    console.log(this.selectedEmployee)

    this.changeAdminRightsAPI(false)
    //this.changeAdminRightsKeyCloak(this.admin)
  }

  public changeProfileButton(arg: string) {

  }

  //-- Get all the employees from the database
  public fetchAllEmployees() {

    const employeeToken = StorageUtil.storageRead(StorageKeys.AuthKey)

    //-- Define the headers
    const headers = new HttpHeaders ({
      "accept": "*/*",
      "Authorization": `Bearer ${employeeToken}`
    })
    this.http.get<any>(environment.APIURL + `employee/all`, {headers})
    .subscribe({
      next: (result) => {
        console.log(result)

        StorageUtil.storageSave(StorageKeys.Employees, result)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  openDialogEditAllUsers(selectedEmployeeName: string): void {
    
    this.selectedEmployee = this.allEmployees.find((x: { first_name: string; }) => x.first_name === selectedEmployeeName);
    console.log(this.selectedEmployee)
    this.dialog.open(ViewAllUsersEditDialogComponent, {
      width: '250px',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      data: { pageValue: this.selectedEmployee }
    })
  }


  public changeAdminRightsKeyCloak(bool: boolean) {
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

  public changeAdminRightsAPI(bool: boolean) {

    const id = this.selectedEmployee.employeeId

    // Get the mastertoken
    const selectedEmployeeToken = StorageUtil.storageRead(StorageKeys.AuthKey)

    //-- Define the headers
    const headers = new HttpHeaders ({
      "accept": "*/*",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${selectedEmployeeToken}`
      })

    var body = {
      "employeeId": id,
      "first_name": this.selectedEmployee.first_name,
      "last_name": this.selectedEmployee.last_name,
      "emailAddress": this.selectedEmployee.emailAddress,
      "admin": bool
    }

    return this.http.patch<any>(environment.APIURL + `employee/update/` + id , body, {headers})
    .subscribe({
      next: (result) => {
        console.log(result)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
