import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-new-user-dialog',
  templateUrl: './new-user-dialog.component.html',
  styleUrls: ['./new-user-dialog.component.css']
})
export class NewUserDialogComponent {

  @Output() login: EventEmitter<void> = new EventEmitter();

  constructor( 
    private readonly router: Router,
    private readonly loginService: LoginService,
    private readonly employeeService: EmployeeService,
    private readonly registerService: RegisterService
    ) { }

  public async registerSubmit(loginForm: NgForm) {
    const { username } = loginForm.value;
    const { email } = loginForm.value;
    const { lastName } = loginForm.value;
    const { firstName } = loginForm.value;

    const { password } = loginForm.value;


    //-- First register in keycloak
    this.registerService.registerKeyCloak(username, email, lastName, firstName, password)

    //-- Then get the userID and store it in session
    this.registerService.getUserByIdKeycloak(email)
  
    //-- Then use that userID to register in the API
    this.registerService.registerAPI(firstName, lastName, email)     
    
    

  }
}