import {Component, Inject} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewUserDialogComponent } from '../new-user-dialog/new-user-dialog.component';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {

  constructor(
    public dialog: MatDialog,
    private readonly router: Router) {

  }

  openDialog() {
    this.dialog.open(NewUserDialogComponent)
  }

  viewAllUsers() {
    this.router.navigateByUrl("/view-users")
  }
}