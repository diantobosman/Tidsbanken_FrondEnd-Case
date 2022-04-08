import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Employee } from '../models/employee.model';
import { StorageUtil } from '../utils/storage.util';

@Injectable({
  providedIn: 'root'
})


export class LoginService {
  private _employee: Employee = {
    preferred_username: "none",
    fullName: "none",
    firstName: "none",
    email: "none@none",
    lastName: "none"
}

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient) { 
    
  }

  get employee(){
    return this._employee
  }

  set employee(employee:Employee){
    this._employee = employee
  }


  // Login
  public login(username: string, password: string) {

    const headers = new HttpHeaders ({
      "Content-Type": "application/x-www-form-urlencoded"
    })

    console.log(username)
    console.log(password)
    var urlencoded = new URLSearchParams();
    urlencoded.append("client_id", "tidsbanken-frontend");
    urlencoded.append("username", username);
    urlencoded.append("password", password);
    urlencoded.append("grant_type", "password");

    this.http.post<any>('https://keycloak-tidsbanken-case.herokuapp.com/auth/realms/tidsbankencase/protocol/openid-connect/token', urlencoded, { headers })
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
        sessionStorage.setItem('authToken', result.access_token)
         this._employee = {
             preferred_username: result.decodedToken.preferred_username,
             fullName: result.decodedToken.name,
             firstName: result.decodedToken.given_name,
             lastName:result.decodedToken.family_name,
             email:result.decodedToken.email
         }
         console.log(this._employee)
         StorageUtil.storageSave<Employee>(StorageKeys.Employee, this._employee)
         this.router.navigateByUrl('/calendar')
         
       },
       error:(error) => {console.log("hello", error)}
     })
  }
}