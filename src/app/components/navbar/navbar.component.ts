import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { User } from 'src/app/models/user.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
  }

    get user(): User | undefined {
      return this.userService.user;
    }

    get employee(): Employee | undefined {
      return this.employeeService.employee
    }

   goToLogoutButton() {
    this.userService.user = undefined
    sessionStorage.clear();
  }

}