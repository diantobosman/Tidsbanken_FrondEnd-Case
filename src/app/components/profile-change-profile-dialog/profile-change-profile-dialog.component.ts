import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { User } from 'src/app/models/user.model';
import { StorageUtil } from 'src/app/utils/storage.util';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-change-profile-dialog',
  templateUrl: './profile-change-profile-dialog.component.html',
  styleUrls: ['./profile-change-profile-dialog.component.css']
})
export class ProfileChangeProfileDialogComponent {


  constructor(
    private readonly http: HttpClient,
  ) { }

  public togglePassword(): void {
    let p = <HTMLInputElement>document.getElementById("password");
    if (p.type === "password") {
      p.type = "text";
    } else {
      p.type = "password";
    }
  }


  public newPassWordSubmit(loginForm: NgForm) {
    const { password } = loginForm.value;

    // Get the mastertoken
    const masterToken = StorageUtil.storageRead(StorageKeys.AuthKeyMaster)
    const idUser = StorageUtil.storageRead<User>(StorageKeys.User)?.id

    //-- Define the headers
    const headers = new HttpHeaders ({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${masterToken}`
    })
    
    //-- Define the body
    var body = {
      "type": "password",
      "temporary": false,
      "value": password
    }

    //-- Post the new user
    return this.http.put<any>(environment.herokuURL + `auth/admin/realms/tidsbankencase/users/` + idUser + `/reset-password`, body, {headers} )
    .subscribe({
      next: (result) => {
        console.log(result)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
