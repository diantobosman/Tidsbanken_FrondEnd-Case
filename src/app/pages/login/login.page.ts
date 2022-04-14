import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { User } from 'src/app/models/user.model';
import { StorageUtil } from 'src/app/utils/storage.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css']
})
export class LoginPage {
  private _user?: User;

  constructor(
    private readonly router: Router
  ) {
    this._user = StorageUtil.storageRead<User>(StorageKeys.User)
   }

  handleLogin(): void {
    this.router.navigateByUrl("/calendar")
  }

}
