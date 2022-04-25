import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { RequestComment } from 'src/app/models/request-comment.model';
import { Vacation } from 'src/app/models/vacation.model';

@Component({
  selector: 'app-history-list-item',
  templateUrl: './history-list-item.component.html',
  styleUrls: ['./history-list-item.component.css'],
  providers: [DatePipe]
})
export class HistoryListItemComponent implements OnInit {

  @Input() vacation! : Vacation;

  vacationStartDate: string | null = "";
  vacationEndDate: string | null = "";

  constructor(private readonly router: Router, private datePipe: DatePipe) { }
  ngOnInit(): void {
    this.vacationStartDate = this.datePipe.transform(this.vacation.periodStart, 'dd-MM-yyyy');
    this.vacationEndDate = this.datePipe.transform(this.vacation.periodEnd, 'dd-MM-yyyy');
  }

  goToVacationDetails(vacation: Vacation){
    this.router.navigateByUrl("vacation-request", { state: { vacation } } )
  }

}
