import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { User } from '../models/user.model';

// Create a testuser instead of fetching the user from the API
const testUser: User= {
  id: 1,
  email: 'foo@gmail.com',
  profilePicture: 'test.png', 
  adminId: 2,
  isAdmin: true
}

@Injectable({
  providedIn: 'root'
})


export class LoginService {

  constructor(private readonly http: HttpClient) { 
  }

  // Login
  public login(email: string): User | undefined {
    if ( email === testUser.email) {
      console.log(testUser)
      return testUser
    }
    else {
      console.log("This user does not exist.")
      return undefined
    }

    // return this.checkEmail(email)
    // .pipe(
    //   switchMap((testUser: User | undefined) => {
    //     if (testUser === undefined) {
    //       return console.log("This user does not exist.")
    //     }
    //     return of(testUser)
    //   })
    // )
  }


  // Check if the user exists
  // private checkEmail(email: string): Observable<User | undefined> {
    
  //   Below should be implemented with the API
  //   return this.http.get<User[]>()
  //     .pipe(
  //       map((response: User[]) => response.pop())
  //     )

  //   testUser.email = email;
  //   return testUser?
  // }
}
