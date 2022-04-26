import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';
import { FunctionUtil } from 'src/app/utils/functions.util';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IneligibleDialogComponent } from '../ineligible-dialog/ineligible-dialog.component';

@Component({
  selector: 'app-new-user-dialog',
  templateUrl: './new-user-dialog.component.html',
  styleUrls: ['./new-user-dialog.component.css']
})
export class NewUserDialogComponent {

  @Output() login: EventEmitter<void> = new EventEmitter();

  public error!: boolean;

  constructor( 
    private readonly registerService: RegisterService,
    private readonly router: Router,
    public dialogRef: MatDialogRef<IneligibleDialogComponent>,
    ) { }

  //-- This function does only work once per login. This bug should be solved.
  public async registerSubmit(loginForm: NgForm): Promise<void> {
    const { username } = loginForm.value;
    const { email } = loginForm.value;
    const { lastName } = loginForm.value;
    const { firstName } = loginForm.value;
    const { password } = loginForm.value;
    const { pictureURL } = loginForm.value;

    (await this.registerService.registerKeyCloak(username, password))
      .subscribe({
        next: async () => {

          console.log("Registering the user in keycloak...")
          await new Promise(resolve => setTimeout(resolve, 500));
          this.getUserAndRegister(firstName, lastName, email, username, pictureURL)
        },
        error: (error) => {
          console.log("Error while registering in keycloak:" + error)
        }
      })
    }
  
    public async getUserAndRegister(firstName: string, lastName: string, email: string, username: string, pictureURL: string) {
      this.registerService.getUserByAnyKeycloak()
        .subscribe({
          next: async (result) => {
            console.log("Registered succesfully... Register in the API now...")
            //-- Get the id of the employee and then register in the API

            const idNewEmployee = FunctionUtil.filterByValue(result, username)[0].id
            
            this.registerService.registerAPI(idNewEmployee, firstName, lastName, email, pictureURL)
            
            this.error = false

            setTimeout(() => {
              this.dialogRef.close()
            }, 2000)
          },
          error: (error) => {
            this.error = true;
          }
        })
    }
  }


