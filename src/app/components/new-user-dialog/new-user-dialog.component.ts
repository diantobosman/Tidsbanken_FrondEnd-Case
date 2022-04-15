import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { FunctionUtil } from 'src/app/utils/functions.util';

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


    (await this.registerService.registerKeyCloak(username, password))
      .subscribe({
        next: async () => {

          console.log("Registering the user in keycloak...")
          await new Promise(resolve => setTimeout(resolve, 5000));
          this.getUserAndRegister(firstName, lastName, email)
        },
        error: (error) => {
          console.log("Error while registering in keycloak:" + error)
        }
      })
    }
  
    public async getUserAndRegister(firstName: string, lastName: string, email: string) {
      this.registerService.getUserByAnyKeycloak()
        .subscribe({
          next: async (result) => {
            console.log("Registered succesfully... Register in the API now...")
            //-- Get the id of the employee and then register in the API
            const idNewEmployee = FunctionUtil.filterByValue(result, email)[0].id

            this.registerService.registerAPI(idNewEmployee, firstName, lastName, email)
          },
          error: (error) => {
            console.log("Error while getUserAndRegister" + error)
          }
        })
    }
  }


