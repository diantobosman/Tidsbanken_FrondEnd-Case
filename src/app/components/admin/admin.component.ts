import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { AllEmployeesService } from 'src/app/services/all-employees.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { StorageUtil } from 'src/app/utils/storage.util';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  private _requests: any[] = [];

  get requests() {
    return this._requests;
  }

  constructor(
    private readonly http: HttpClient,
    private readonly allEmployeesService: AllEmployeesService
    ) { }

  ngOnInit(): void {
    this.fetchAllEmployees()
    this.fetchAllRequests()
  }

  //-- Get all the employees from the database
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

        this.allEmployeesService.employees = result;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }


  public fetchAllRequests() {
    
    const employeeToken = StorageUtil.storageRead(StorageKeys.AuthKey)

    //-- Define the headers
    const headers = new HttpHeaders ({
      "accept": "*/*",
      "Authorization": `Bearer ${employeeToken}`
    })

    this.http.get<any>(environment.APIURL + `vacation_request/`, {headers})
    .subscribe({
      next: (result) => {
        this._requests = result
        console.log(this._requests)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
