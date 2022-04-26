import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vacation } from 'src/app/models/vacation.model';
import { VacationService } from 'src/app/services/vacation.service';

@Component({
  selector: 'app-vacation-request-summary-item',
  templateUrl: './vacation-request-summary-item.component.html',
  styleUrls: ['./vacation-request-summary-item.component.css'],
  providers: [DatePipe]
})
export class VacationRequestSummaryItemComponent implements OnInit {

  @Input() vacation!: Vacation;

  periodStart: string | null = "";
  periodEnd: string | null = "";

  constructor(
    private readonly vacationService: VacationService, 
    private readonly router: Router,
    private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.periodStart = this.datePipe.transform(this.vacation.periodStart, 'dd-MM-yyyy');
    this.periodEnd = this.datePipe.transform(this.vacation.periodEnd, 'dd-MM-yyyy');
  }

  get isLoading(): boolean{
    return this.vacationService.loading;
  }

  backToDashboard(){
    this.router.navigateByUrl("calendar")
  }

}
