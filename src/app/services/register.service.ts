import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../enums/storage-keys.enum';
import { StorageUtil } from '../utils/storage.util';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private readonly http: HttpClient) { }

  //-- Register the user
  public registerKeyCloak(username: string, email: string, lastName: string, firstName: string, password: string) {
    
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
    this.http.post<any>(environment.herokuURL + `auth/admin/realms/tidsbankencase/users`, body, {headers} )
    .subscribe({
      next: (result)=>{console.log(result)},
      error:(error)=> {console.log(error)}
    })
  }

  public registerAPI(firstName: string, lastName: string, email: string) {

    // Get the mastertoken
    const employeeToken = StorageUtil.storageRead(StorageKeys.AuthKey)

    //-- Define the headers
    const headers = new HttpHeaders ({
      "accept": "*/*",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${employeeToken}`
      })

    var body = {
      "employeeId": "testIddtht",
      "first_name": firstName,
      "last_name": lastName,
      "emailAddress": email
    }

    //-- Post the new user
    this.http.post<any>(environment.APIURL + `employee/register`, body, {headers})
    .subscribe({
      next: (result)=>{"Posted API succes"},
      error:(error)=> {console.log(error)}
    })

  }
}