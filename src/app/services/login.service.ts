import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Employee } from '../models/employee.model';
import { StorageUtil } from '../utils/storage.util';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  //-- Define initial employee (Deans demo)
  private _employee: Employee = {
    id: 0,
    username: "none",
    fullName: "none",
    firstName: "none",
    email: "none@none",
    lastName: "none"
  }

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient) { 
  }

  //-- Getter
  get employee(){
    return this._employee
  }

  //-- Setter
  set employee(employee:Employee){
    this._employee = employee
  }

  // Login
  public login(username: string, password: string) {

    //-- Define the header
    const headers = new HttpHeaders ({
      "Content-Type": "application/x-www-form-urlencoded"
    })

    //-- Define the body
    var urlencoded = new URLSearchParams();
    urlencoded.append("client_id", "tidsbanken-id");
    urlencoded.append("username", username);
    urlencoded.append("password", password);
    urlencoded.append("grant_type", "password");

    //-- Fetch
    this.http.post<any>(environment.herokuURL + `auth/realms/tidsbankencase/protocol/openid-connect/token`, urlencoded, { headers })
    .pipe(
        map(kcResult => {
          return {
            ...kcResult,
            decodedToken: JSON.parse(atob(kcResult.access_token.split('.')[1]))
           }
         })
      )
      .subscribe({
       next: (result)=>{
         //-- Define the logged in employee
         this._employee = {
           id: result.decodedToken.sub,
           username: result.decodedToken.preferred_username,
           fullName: result.decodedToken.name,
           firstName: result.decodedToken.given_name,
           lastName:result.decodedToken.family_name,
           email:result.decodedToken.email
          }
          //-- Navigate to the calendar page and store they the employee and the key in sessionstorage
          this.router.navigateByUrl('/calendar')
          StorageUtil.storageSave<Employee>(StorageKeys.Employee, this._employee)
          StorageUtil.storageSave(StorageKeys.AuthKey, result.access_token)
         
       },
       error:(error) => {console.log("This user does not exist:", error)}
     })
  }
}