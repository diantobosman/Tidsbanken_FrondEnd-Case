import { Component, OnInit } from '@angular/core';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { StorageUtil } from '../../utils/storage.util';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-view-all-users',
  templateUrl: './view-all-users.component.html',
  styleUrls: ['./view-all-users.component.css']
})
export class ViewAllUsersComponent implements OnInit {

  constructor(
    private readonly http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.fetchAllEmployees()
  }

  typesEmployees  = StorageUtil.storageRead<any>(StorageKeys.Employees)
  
  public filterNames() {
    
  }



  public fetchAllEmployees() {

    const employeeToken = StorageUtil.storageRead(StorageKeys.AuthKey)

    //-- Define the headers
    const headers = new HttpHeaders ({
      "accept": "*/*",
      "Authorization": `Bearer ${employeeToken}`
    })
    this.http.get<any>(environment.APIURL + `employee/all`, {headers})
    .subscribe({
      next: (result) => {
        console.log(result)

        StorageUtil.storageSave(StorageKeys.Employees, JSON.stringify(result))
      },
      error: (error) => {
        console.log(error)
      }
    })
  }


  //   //-- Post the new user
  //   this.http.get<any>(environment.APIURL + `employee/` + id, {headers})
  //   .subscribe({
  //     next: (result)=>{
  //       //-- If the user exists then save it
  //       this._employee = {
  //         employeeId: result.employeeId,
  //         first_name: result.first_name,
  //         last_name: result.last_name,
  //         emailAddress: result.emailAddress,
  //         admin: result.admin
  //        }
        
  //       StorageUtil.storageSave<Employee>(StorageKeys.Employee, this._employee)
  //     },
  //     error:(error)=> {
  //       // If the user does not exist, then register the user.
  //       console.log(error)
  //     }
  //   })
  // }



}
