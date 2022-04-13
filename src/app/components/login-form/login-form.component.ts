import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { LoginService } from 'src/app/services/login.service';
import { EmployeeService } from 'src/app/services/employee.service';


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

  public loginSubmit(loginForm: NgForm) {
    const { username } = loginForm.value;
    const { password } = loginForm.value;

    //-- First store the master token in de session storage
    this.loginService.getMasterToken()

    //-- Then login
    this.loginService.loginKeyCloak(username, password)
    //-- Here login to api too



    
  }
}