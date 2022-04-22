import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../enums/storage-keys.enum';
import { StorageUtil } from '../utils/storage.util';
import { AllEmployeesService } from './all-employees.service';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly allEmployeeService: AllEmployeesService
    ) { }

  //-- Register the user
  public async registerKeyCloak(username: string, password: string) {
    
    // Get the mastertoken
    const masterToken = StorageUtil.storageRead(StorageKeys.AuthKeyMaster)
    
    //-- Define the headers
    const headers = new HttpHeaders ({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${masterToken}`
    })
    
    //-- Define the body
    var body = {
      "username": username,
      "enabled": true,
      "credentials": [
        {
          "type": "password",
          "value": password,
          "temporary": false
        }
      ]
    }

    //-- Post the new user
    return this.http.post<any>(environment.herokuURL + `auth/admin/realms/tidsbankencase/users`, body, {headers} )
  }

  //-- Register the employee in the API storage
  public async registerAPI(id: string, firstName: string, lastName: string, email: string) {
    console.log("The new ID is: " + id)
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
      "first_name": firstName,
      "last_name": lastName,
      "emailAddress": email,
      "admin": false
    }

    //-- Post the new user
    return this.http.post<any>(environment.APIURL + `employee/register`, body, {headers})
    .subscribe({
      next: (result)=>{
        //-- Add the user using concat
        this.allEmployeeService.employees = this.allEmployeeService.employees.concat(result)
      },
      error:(error)=> {console.log("Post API not succesfull: " + error)}
    })
  }

  public getUserByAnyKeycloak(): Observable<any> {

    const masterToken = StorageUtil.storageRead(StorageKeys.AuthKeyMaster)

    //-- Define the headers
    const headers = new HttpHeaders ({
      "Accept": "*/*",
      "Authorization": `Bearer ${masterToken}`
      })

    //-- Post the new user
    return this.http.get<any>("https://keycloak-tidsbanken-case.herokuapp.com/auth/admin/realms/tidsbankencase/users", {headers})
  }
}