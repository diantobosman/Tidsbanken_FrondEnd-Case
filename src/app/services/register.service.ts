import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private readonly http: HttpClient) { }

  //-- Register the user
  public registerUp(username: string, email: string, lastName: string, firstName: string, password: string, masterToken: string) {
    
    //-- Define the headers
    const headers = new HttpHeaders ({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${masterToken}`
    })
    
    //-- Define the body
    var body = {
      "username": username,
      "email": email,
      "lastName": lastName,
      "firstName": firstName,
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

  //-- Register but first get the token 
  public register(username: string, email: string, lastName: string, firstName: string, password: string) {

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
         //-- Register the user with the fetched token
         this.registerUp(username, email, lastName, firstName, password, result.access_token)
       },
       error:(error) => {console.log("hello", error)}
     })
  }
}