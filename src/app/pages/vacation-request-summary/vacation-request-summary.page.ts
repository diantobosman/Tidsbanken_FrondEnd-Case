import { Component, OnInit } from '@angular/core';
import { Vacation } from 'src/app/models/vacation.model';

@Component({
  selector: 'app-vacation-request-summary',
  templateUrl: './vacation-request-summary.page.html',
  styleUrls: ['./vacation-request-summary.page.css']
})
export class VacationRequestSummaryPage implements OnInit {

  vacation!: Vacation;

  constructor() { }

  ngOnInit(): void {
    this.vacation = history.state.vacation;
  }
}
