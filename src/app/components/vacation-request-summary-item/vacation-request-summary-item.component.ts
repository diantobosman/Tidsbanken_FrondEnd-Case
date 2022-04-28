import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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

  constructor(
    private readonly vacationService: VacationService,
    private datePipe: DatePipe) {}

  ngOnInit(): void {
  }

  get isLoading(): boolean{
    return this.vacationService.loading;
  }

  // helper method to check whether vacation has comments
  isString(val: any): boolean { 
    if(this.vacation.comment.length > 0){
      return typeof val === 'object'; 
    }
    return false;
  }

}
