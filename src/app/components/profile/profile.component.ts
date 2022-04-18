import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProfileChangeProfileDialogComponent } from '../profile-change-profile-dialog/profile-change-profile-dialog.component';
import { ProfileGiveAdminRightsComponent } from '../profile-give-admin-rights/profile-give-admin-rights.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {

  constructor(
    private readonly employeeService: EmployeeService,
    public dialog: MatDialog
  ) {}

   get employee(): Employee | undefined {
    return this.employeeService.employee;
  }

  openDialogChangeProfileDetails() {
    this.dialog.open(ProfileChangeProfileDialogComponent);
  }

  openDialogChangeAdminRights() {
    this.dialog.open(ProfileGiveAdminRightsComponent);
  }
}



// openDialog() {
//   this.dialog.open(NewUserDialogComponent)
// }