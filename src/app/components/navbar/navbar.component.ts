import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly router: Router
  ) { }

    get user(): Employee | undefined {
      return this.employeeService.employee;
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
    sessionStorage.removeItem(StorageKeys.Employee)
    sessionStorage.removeItem(StorageKeys.AuthKey)
    this.router.navigateByUrl("/login")
  }

}