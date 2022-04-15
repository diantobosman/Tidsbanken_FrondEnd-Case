import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { functionUtil } from 'src/app/utils/functions.util';

@Component({
  selector: 'app-new-user-dialog',
  templateUrl: './new-user-dialog.component.html',
  styleUrls: ['./new-user-dialog.component.css']
})
export class NewUserDialogComponent {

  @Output() login: EventEmitter<void> = new EventEmitter();

  constructor( 
    private readonly registerService: RegisterService
    ) { }

  //-- This function does only work once per login. This bug should be solved.
  public async registerSubmit(loginForm: NgForm): Promise<void> {
    const { username } = loginForm.value;
    const { email } = loginForm.value;
    const { lastName } = loginForm.value;
    const { firstName } = loginForm.value;
    const { password } = loginForm.value;

    //-- First register in keycloak
    this.registerService.registerKeyCloak(username, email, lastName, firstName, password)
      .then(() => {
        getUserAndRegister()
      })

    //-- Then get the userID and store it in session
    const getUserAndRegister = (): any => {
    this.registerService.getUserByAnyKeycloak()
      .subscribe({
        next: (result) => {
          //-- Filter the id from the user with certain email
          const idNewEmployee = functionUtil.filterByValue(result, email)[0].id

          //-- Then use that userID to register in the API
          this.registerService.registerAPI(idNewEmployee, firstName, lastName, email) 
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
  }
}