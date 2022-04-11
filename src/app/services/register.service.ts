import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private _employee: Employee = {
    id: 0,
    preferred_username: "none",
    fullName: "none",
    firstName: "none",
    email: "none@none",
    lastName: "none"
}

  constructor(private readonly http: HttpClient) { }

  const body = {
    "username": "insert new username here",
    "credentials":[{
        
    }]
  }
  public register() {
    this.http.post<any>('https://keycloak-tidsbanken-case.herokuapp.com/auth/realms/tidsbankencase/users', body)


  }
}
