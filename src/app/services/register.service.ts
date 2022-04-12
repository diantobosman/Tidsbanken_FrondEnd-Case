import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Employee } from '../models/employee.model';

const credentials = {
  username: 'test',
  email: 'test2'
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private readonly http: HttpClient) { }

  //-- Below is to register
  public registerUp(username: string, email: string, lastName: string, firstName: string, masterToken: string) {
    console.log("User details:")
    console.log(username)
    console.log(lastName)
    console.log(email)
    console.log(firstName)

    const headers = new HttpHeaders ({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${masterToken}`
    })
    
    var body = {
      "username": username,
      "email": email,
      "lastName": lastName,
      "firstName": firstName,
      // "credentials":[{
      //   "password": "try"
      // }]
    }

    this.http.post<any>('https://keycloak-tidsbanken-case.herokuapp.com/auth/admin/realms/tidsbankencase/users', body, {headers} )
    .subscribe({
      next: (result)=>{console.log(result)},
      error:(error)=> {console.log(error)}
    })
  }

  //-- Below is to get the token 
  public register(username: string, email: string, lastName: string, firstName: string) {

    const headers = new HttpHeaders ({
      "Content-Type": "application/x-www-form-urlencoded"
    })

    var urlencoded = new URLSearchParams();
    urlencoded.append("client_id", "admin-cli");
    urlencoded.append("username", "admin");
    urlencoded.append("password", "admin");
    urlencoded.append("grant_type", "password");

    this.http.post<any>('https://keycloak-tidsbanken-case.herokuapp.com/auth/realms/master/protocol/openid-connect/token', urlencoded, { headers })
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
        this.registerUp(username, email, lastName, firstName, result.access_token)
       },
       error:(error) => {console.log("hello", error)}
     })
  }
}