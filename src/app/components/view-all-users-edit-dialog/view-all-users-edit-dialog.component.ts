import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { StorageUtil } from 'src/app/utils/storage.util';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-all-users-edit-dialog',
  templateUrl: './view-all-users-edit-dialog.component.html',
  styleUrls: ['./view-all-users-edit-dialog.component.css']
})
export class ViewAllUsersEditDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly http: HttpClient,
  ) { }

  ngOnInit(): void {
  }

  get selectedEmployee() {
    return this.data.pageValue
  }

  public newEmailSubmit(loginForm: NgForm) {
    const { email } = loginForm.value
    const id = this.selectedEmployee.employeeId

    // Get the mastertoken
    const employeeToken = StorageUtil.storageRead(StorageKeys.AuthKey)

    //-- Define the headers
    const headers = new HttpHeaders ({
      "accept": "*/*",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${employeeToken}`
      })

    var body = {
      "employeeId": id,
      "first_name": this.selectedEmployee.first_name,
      "last_name": this.selectedEmployee.last_name,
      "emailAddress": email,
    }

    return this.http.patch<any>(environment.APIURL + `employee/update/` + id , body, {headers})
    .subscribe({
      next: () => {   
        this.selectedEmployee.emailAddress = email
      },
      error: (error) => {
        console.log("Error: " + error)
      }
    })
  }

}