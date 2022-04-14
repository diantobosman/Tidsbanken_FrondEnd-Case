import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../enums/storage-keys.enum';
import { User } from '../models/user.model';
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

  //-- Register the employee in the API storage
  public async registerAPI(firstName: string, lastName: string, email: string): Promise<any> {

    // Get the mastertoken
    const employeeToken = StorageUtil.storageRead(StorageKeys.AuthKey)

    const id = StorageUtil.storageRead(StorageKeys.NewUserID)

    console.log("The new ID from keycloak is: " + id)

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
      "emailAddress": email
    }

    //-- Post the new user
    this.http.post<any>(environment.APIURL + `employee/register`, body, {headers})
    .subscribe({
      next: (result)=>{"Posted API succes"},
      error:(error)=> {console.log(error)}
    })
  }

  public async getUserByIdKeycloak(email: string): Promise<any> {

    const masterToken = StorageUtil.storageRead(StorageKeys.AuthKeyMaster)

    //-- Define the headers
    const headers = new HttpHeaders ({
      "Accept": "*/*",
      "Authorization": `Bearer ${masterToken}`
      })

    //-- Post the new user
    this.http.get<any>("https://keycloak-tidsbanken-case.herokuapp.com/auth/admin/realms/tidsbankencase/users", {headers})
    .subscribe({
      next: (result) => {
        const idEmployee = filterByValue(result, email)[0].id
        console.log("The ID of the employee is:" + filterByValue(result, email)[0].id)
        
        StorageUtil.storageSave(StorageKeys.NewUserID, idEmployee)
      }
    })

  }
}

function filterByValue(array: any[], value: string) {
  return array.filter((data) =>  JSON.stringify(data).toLowerCase().indexOf(value.toLowerCase()) !== -1);
}