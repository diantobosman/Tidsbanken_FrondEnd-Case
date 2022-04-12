import {Component, Inject} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewUserDialogComponent } from '../new-user-dialog/new-user-dialog.component';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {

  constructor(public dialog: MatDialog) {
  }

  openDialog() {
    this.dialog.open(NewUserDialogComponent)
  }
}