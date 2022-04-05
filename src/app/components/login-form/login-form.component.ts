import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  constructor( private readonly loginService: LoginService) { }

  public loginSubmit(loginForm: NgForm): void {

    const { email } = loginForm.value;

    console.log(email)
    this.loginService.login(email)



  }
}
    // Below only if fetching works too
    //   .subscribe({
    //     next: (user: User) => {

    //     },
    //     error: () => {

    //     }
    //   })
    // }