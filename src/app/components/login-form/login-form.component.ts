import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { LoginService } from 'src/app/services/login.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { User } from 'src/app/models/user.model';
import { StorageUtil } from 'src/app/utils/storage.util';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { UserService } from 'src/app/services/user.service';
import { RegisterService } from 'src/app/services/register.service';
import { CalendarComponent } from '../calendar/calendar.component';
import { VacationService } from 'src/app/services/vacation.service';
import { Vacation } from 'src/app/models/vacation.model';
import { IneligableService } from 'src/app/services/ineligable.service';
import { Ineligable } from 'src/app/models/ineligable.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent {

  public error: boolean = false;
  private eventArray: object[] = [];

  @Output() login: EventEmitter<void> = new EventEmitter();

  constructor( 
    private readonly router: Router,
    private readonly loginService: LoginService,
    private readonly userService: UserService,
    private readonly registerService: RegisterService,
    private readonly vacationService: VacationService,
    private readonly ineligableService: IneligableService,
    ) { }

  public togglePassword(): void {
    let p = <HTMLInputElement>document.getElementById("password");
    if (p.type === "password") {
      p.type = "text";
    } else {
      p.type = "password";
    }
  }

  public loginSubmit(loginForm: NgForm): void {
    const { username } = loginForm.value;
    const { password } = loginForm.value;

    //-- First store the master token in de session storage
    this.loginService.getMasterToken();

    //-- Then login
    this.loginService.loginKeyCloak(username, password)
      .subscribe ({
        next: (result) => {
          //-- Get the employee from the database
          this.loginService.getEmployeeByIdAPI(result.decodedToken.sub, result.access_token)

          //-- Define the logged in employee
          this.userService.user = {
            id: result.decodedToken.sub,
            username: result.decodedToken.preferred_username,
            email: result.decodedToken.email
        }

        //-- Navigate to the calendar page and store they the employee and the key in sessionstorage
        StorageUtil.storageSave<User>(StorageKeys.User, this.userService.user)
        StorageUtil.storageSave(StorageKeys.AuthKey, result.access_token)
        
        this.login.emit();

        },
        error: (error) => {
          this.error = true;
        }
      })

      //-- Get all ineligable period + in array
      this.ineligableService.getAllIneligable()
      .subscribe({
        next: (events: any[]) => {
          events.forEach((event: Ineligable) => {
            this.eventArray.push({
              title: "Ineligable period",
              start: event.periodStart,
              end: event.periodEnd,
              color: 'black'
            })
          })
        }
      })

      //-- Get all vacation + put in same array then put in storage
      this.vacationService.getAllVacations()
    .subscribe({
      next: (events: any[]) => {
        events.forEach((event: Vacation) => {
          if (event.status === "APPROVED") {
            this.eventArray.push({
              allDay: true,
              color: '#239B56',
              end: event.periodEnd,
              start: event.periodStart,
              title: event.title,
              url: 'link naar request',
            })
          } else if (event.status === "DENIED") {
            this.eventArray.push({
              allDay: true,
              color: '#7B241C',
              end: event.periodEnd,
              start: event.periodStart,
              title: event.title,
              url: 'link naar request',
            })
          } else {
            this.eventArray.push({
              allDay: true,
              textColor: '#17202A',
              backgroundColor: '#CACFD2',
              borderColor: '#239B56',
              end: event.periodEnd,
              start: event.periodStart,
              title: event.title,
              url: 'link naar request',
            })
          }
          
          
        })
        console.log(this.eventArray)
        StorageUtil.storageSave(StorageKeys.Events, this.eventArray);
       
      }

      
    }
    )
  }
  
}