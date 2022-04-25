
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { Vacation } from 'src/app/models/vacation.model';
import { AllEmployeesService } from 'src/app/services/all-employees.service';
import { CommentService } from 'src/app/services/comment.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { StorageUtil } from 'src/app/utils/storage.util';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [DatePipe]
})
export class AdminComponent implements OnInit {

  private _requests: any[] = [];
  private _requestDates: any[] | undefined;

  get requests() {
    return this._requests;
  }

  constructor(
    private readonly http: HttpClient,
    private readonly allEmployeesService: AllEmployeesService,
    private readonly employeeService: EmployeeService,
    private readonly commentService: CommentService,
    private datePipe: DatePipe
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
      next: (result: Vacation[]) => {
        this._requests = [];
          result.forEach((vacation) => {
            this.employeeService.getEmployeeById(vacation.requestOwner.toString()).subscribe(
              employee =>{
                vacation.requestOwner = employee;
              }
            )
            this.commentService.getComments(vacation.requestId).subscribe(
              comments =>{
                vacation.comment = comments
              }
            )
            this._requests.push(vacation);
          })
        this._requests = result
        this.changeDates()

      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  //-- Change the dates to only day-month-year
  public changeDates() {
    //-- Loop through the array of objects. There are better solutions than using a for-loop, but for now it works.
    for(let i = 0; i < this._requests.length; i++) {
      this._requests[i].periodStart = this.datePipe.transform(this._requests[i].periodStart, 'dd-MM-yyyy')
      this._requests[i].periodEnd = this.datePipe.transform(this._requests[i].periodEnd, 'dd-MM-yyyy')
    }


  }

}
