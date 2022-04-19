import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';
import { StorageKeys } from '../enums/storage-keys.enum';
import { User } from '../models/user.model';
import { StorageUtil } from '../utils/storage.util';
import { environment } from 'src/environments/environment';
import { RegisterService } from './register.service';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  //-- Define initial employee (Deans demo)
  public _user: User = {
    id: 0,
    username: "none",
    email: "none"
  }

  private _employee: Employee = {
    employeeId: "a",
    first_name: "none",
    last_name: "none",
    emailAddress: "none",
    admin: false
  }

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly registerService: RegisterService
    ) { 
  }

  //-- Getter
  get user(){
    return this._user
  }

  get employee() {
    return this._employee
  }

  //-- Setter
  set user(user: User){
    this._user = user
  }

  set employee(employee: Employee) {
    this._employee = employee
  }

  // Login
  public loginKeyCloak(username: string, password: string): Observable<any> {

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
    return this.http.post<any>(environment.herokuURL + `auth/realms/tidsbankencase/protocol/openid-connect/token`, urlencoded, { headers })
    .pipe(
        map(kcResult => {
          return {
            ...kcResult,
            decodedToken: JSON.parse(atob(kcResult.access_token.split('.')[1]))
           }
         })
      )
  }


  public getEmployeeByIdAPI(id: string, employeeToken: string) {
  
    //-- Define the headers
    const headers = new HttpHeaders ({
      "accept": "*/*",
      "Authorization": `Bearer ${employeeToken}`
      })

    //-- Post the new user
    this.http.get<any>(environment.APIURL + `employee/` + id, {headers})
    .subscribe({
      next: (result)=>{
        //-- If the user exists then save it
        this._employee = {
          employeeId: result.employeeId,
          first_name: result.first_name,
          last_name: result.last_name,
          emailAddress: result.emailAddress,
          admin: result.admin
         }
        
        StorageUtil.storageSave<Employee>(StorageKeys.Employee, this._employee)
      },
      error:(error)=> {
        // If the user does not exist, then register the user.
        console.log(error)
      }
    })
  }

  //-- This function is to get the master token in session storage
  public getMasterToken() {

    //-- Define the header
    const headers = new HttpHeaders ({
      "Content-Type": "application/x-www-form-urlencoded"
    })

    //-- Define the body
    var urlencoded = new URLSearchParams();
    urlencoded.append("client_id", "admin-cli");
    urlencoded.append("username", "admin");
    urlencoded.append("password", "admin");
    urlencoded.append("grant_type", "password");

    //-- Fetch the token from the master realm
    this.http.post<any>(environment.herokuURL + `auth/realms/master/protocol/openid-connect/token`, urlencoded, { headers })
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
        //-- Put masterToken in session storage
        StorageUtil.storageSave(StorageKeys.AuthKeyMaster, result.access_token)
       },
       error:(error) => {console.log("hello", error)}
     })
  }






}