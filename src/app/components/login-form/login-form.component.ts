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

  public loginSubmit(loginForm: NgForm): void {

    const { email } = loginForm.value;
    let employee = this.loginService.login(email)
    this.employeeService.employee = employee;
    this.login.emit();

    // this.loginService.login(email)
    //   .subscribe({
    //     next: (user: User) => {
    //       this.userService.user = user;
    //       this.login.emit();
    //     },
    //     error: () => {

    //     }
    //   })
    // }
  }
}