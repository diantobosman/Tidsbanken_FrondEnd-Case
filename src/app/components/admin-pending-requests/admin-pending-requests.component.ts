import { Component, Input, OnInit } from '@angular/core';

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
    console.log("test" + this.allTitles)
  }

  
}
