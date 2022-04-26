import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { Employee } from 'src/app/models/employee.model';
import { User } from 'src/app/models/user.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { StorageUtil } from 'src/app/utils/storage.util';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-change-profile-dialog',
  templateUrl: './profile-change-profile-dialog.component.html',
  styleUrls: ['./profile-change-profile-dialog.component.css']
})
export class ProfileChangeProfileDialogComponent {

  constructor(
    private readonly http: HttpClient,
    private readonly employeeService: EmployeeService
  ) { }

  public togglePassword(): void {
    let p = <HTMLInputElement>document.getElementById("password");
    if (p.type === "password") {
      p.type = "text";
    } else {
      p.type = "password";
    }
  }

  public newEmailSubmit(loginForm: NgForm) {
    console.log("Changing the email...")
    const { email } = loginForm.value;
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
      "emailAddress": email,
    }

    return this.http.patch<any>(environment.APIURL + `employee/update/` + id , body, {headers})
    .subscribe({
      next: (result) => {   
        this.employeeService.employee!.emailAddress =  email 
        StorageUtil.storageSave(StorageKeys.Employee, this.employeeService.employee)
      },
      error: (error) => {
        console.log("Error: " + error)
      }
    })
  }

  public newPassWordSubmit(loginForm: NgForm) {
    const { password } = loginForm.value;

    // Get the mastertoken
    const masterToken = StorageUtil.storageRead(StorageKeys.AuthKeyMaster)
    const idUser = StorageUtil.storageRead<User>(StorageKeys.User)?.id

    //-- Define the headers
    const headers = new HttpHeaders ({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${masterToken}`
    })
    
    //-- Define the body
    var body = {
      "type": "password",
      "temporary": false,
      "value": password
    }

    //-- Post the new user
    return this.http.put<any>(environment.herokuURL + `auth/admin/realms/tidsbankencase/users/` + idUser + `/reset-password`, body, {headers} )
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
