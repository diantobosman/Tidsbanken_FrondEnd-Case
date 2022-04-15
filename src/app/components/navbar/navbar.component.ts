import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) { }

  ngOnInit(): void {
  }

    get user(): User | undefined {
      return this.userService.user;
    }

   goToLogoutButton() {
    this.userService.user = undefined
    sessionStorage.clear();
  }

}