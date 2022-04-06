import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) { }

    get user(): User | undefined {
      return this.userService.user;
    }

  ngOnInit(): void {
  }
  
  goToCalendarButton() {
    this.router.navigateByUrl("/calendar")
  }

  goToViewHistoryButton() {
    this.router.navigateByUrl("/vacation-history")
  }

  goToUserProfileButton() {
    this.router.navigateByUrl("/user-profile")
  }

  goToAdminAreaButton() {
    this.router.navigateByUrl("/admin-area")
  }

  goToLogoutButton() {
    sessionStorage.removeItem(StorageKeys.User)
    this.router.navigateByUrl("/login")
  }

}