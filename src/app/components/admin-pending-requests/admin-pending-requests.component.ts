import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { AllEmployeesService } from 'src/app/services/all-employees.service';
import { StorageUtil } from 'src/app/utils/storage.util';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-pending-requests',
  templateUrl: './admin-pending-requests.component.html',
  styleUrls: ['./admin-pending-requests.component.css']
})

export class AdminPendingRequestsComponent {

  //-- Binding the fetched requests from the admin component
  @Input() requests: any[] = [];

  constructor(
    private readonly http: HttpClient
  )
  {}

  //-- This function is called when the approve button is clicked
  public approveButton(requestId: number) {
    
    //-- Get the employee token from localstorage
    const employeeToken = StorageUtil.storageRead(StorageKeys.AuthKey);

    //-- Define the headers
    const headers = new HttpHeaders ({
      "accept": "*/*",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${employeeToken}`
      })

    //-- Define the body
    var body = {
      "requestId": requestId, 
      "status": "APPROVED"
    }

    //-- Fetch request
    return this.http.patch<any>(environment.APIURL + `vacation_request/update/` + requestId, body, {headers})
    .subscribe({
      next: (result)=>{
        //-- Find the index of the request
        let objIndex = this.requests.findIndex((obj => obj.requestId === result.requestId));

        //-- Change that index using the result of the fetch
        this.requests[objIndex] = JSON.stringify(result)
        window.alert("Approved the vacation request.")

      },
      error:(error)=> {console.log("Post API not succesfull: " + error)}
    })
  }

  //-- This function is called when the deny button is clicked
  public denyButton(requestId: number) {

    //-- Get the employee token from localstorage
    const employeeToken = StorageUtil.storageRead(StorageKeys.AuthKey);

    //-- Define the headers
    const headers = new HttpHeaders ({
      "accept": "*/*",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${employeeToken}`
      })

    //-- Define the body
    var body = {
      "requestId": requestId, 
      "status": "DENIED"
    }

    //-- Fetch request
    return this.http.patch<any>(environment.APIURL + `vacation_request/update/` + requestId, body, {headers})
    .subscribe({
      next: (result)=>{
        //-- Find the index of the request
        let objIndex = this.requests.findIndex((obj => obj.requestId === result.requestId));

        //-- Change that index using the result of the fetch
        this.requests[objIndex] = JSON.stringify(result)
        window.alert("Denied the vacation request.")

      },
      error:(error)=> {console.log("Post API not succesfull: " + error)}
    })
  }
}