import { Vacation } from 'src/app/models/vacation.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vacation-request',
  templateUrl: './vacation-request.page.html',
  styleUrls: ['./vacation-request.page.css']
})
export class VacationRequestPage implements OnInit {

  vacation!: Vacation;

  constructor() {}

  ngOnInit(): void {
    this.vacation = history.state.vacation;
  }

}
