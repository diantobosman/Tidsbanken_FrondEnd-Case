import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProfileChangeProfileDialogComponent } from '../profile-change-profile-dialog/profile-change-profile-dialog.component';
import {ThemePalette} from '@angular/material/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { StorageUtil } from 'src/app/utils/storage.util';
import { FunctionUtil } from 'src/app/utils/functions.util';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {


  disabled = false;

  constructor(
    private readonly employeeService: EmployeeService,
    public dialog: MatDialog,
    private readonly http: HttpClient
  ) { }

   get employee(): Employee | undefined {
    return this.employeeService.employee;
  }

  openDialogChangeProfileDetails() {
    this.dialog.open(ProfileChangeProfileDialogComponent);
  }

}
