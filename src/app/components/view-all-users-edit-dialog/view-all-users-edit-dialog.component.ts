import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-view-all-users-edit-dialog',
  templateUrl: './view-all-users-edit-dialog.component.html',
  styleUrls: ['./view-all-users-edit-dialog.component.css']
})
export class ViewAllUsersEditDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  get selectedEmployee() {
    return this.data.pageValue
  }
}