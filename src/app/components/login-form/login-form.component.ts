import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { LoginService } from 'src/app/services/login.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { User } from 'src/app/models/user.model';
import { StorageUtil } from 'src/app/utils/storage.util';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent {

  @Output() login: EventEmitter<void> = new EventEmitter();

  constructor( 
    private readonly router: Router,
    private readonly loginService: LoginService,
    private readonly employeeService: EmployeeService
    ) { }

  public loginSubmit(loginForm: NgForm): void {
    const { username } = loginForm.value;
    const { password } = loginForm.value;

    //-- First store the master token in de session storage
    this.loginService.getMasterToken();

    //-- Then login
    this.loginService.loginKeyCloak(username, password)
      .subscribe ({
        next: (result) => {
          console.log("RESULT: " + result)
          //-- Get the employee from the database
          //this.loginService.getEmployeeAPI(result.decodedToken.sub, result.decodedToken)

          //-- Define the logged in employee
          this.loginService._user = {
            id: result.decodedToken.sub,
            username: result.decodedToken.preferred_username
        }

        //-- Navigate to the calendar page and store they the employee and the key in sessionstorage
        StorageUtil.storageSave<User>(StorageKeys.User, this.loginService._user)
        StorageUtil.storageSave(StorageKeys.AuthKey, result.access_token)

        console.log("WORKS! :D");
        console.log(this.loginService._user);
        this.login.emit();

        },
        error: (error) => {
          console.log("Error: " + error)
        }
      })
  }
  
}