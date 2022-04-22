import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { StorageUtil } from 'src/app/utils/storage.util';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-pending-requests',
  templateUrl: './admin-pending-requests.component.html',
  styleUrls: ['./admin-pending-requests.component.css']
})
export class AdminPendingRequestsComponent implements OnInit {
  @Input() requests: any[] = [];
  public allTitles: any;
  public comments: any;

  constructor(
    private readonly http: HttpClient
  ) {
    
   }

  ngOnInit(): void {
    this.onlyPendingRequests()
  }

  public showRequests() {
    this.onlyPendingRequests()
  }

  public onlyPendingRequests() {
    this.allTitles = this.requests.map((element: { title: any }) => element.title)
    this.comments = this.requests.map((element: { comments: any }) => element.comments)
  }

  public approveButton(requestId: number) {
    
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

    return this.http.patch<any>(environment.APIURL + `vacation_request/update/` + requestId, body, {headers})
    .subscribe({
      next: (result)=>{
        console.log(result)
      },
      error:(error)=> {console.log("Post API not succesfull: " + error)}
    })
  }



  public denyButton(requestId: number) {

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

    return this.http.patch<any>(environment.APIURL + `vacation_request/update/` + requestId, body, {headers})
    .subscribe({
      next: (result)=>{
        console.log(result)
      },
      error:(error)=> {console.log("Post API not succesfull: " + error)}
    })
  }
  
}