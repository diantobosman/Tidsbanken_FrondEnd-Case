import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vacation } from 'src/app/models/vacation.model';
import { VacationService } from 'src/app/services/vacation.service';

@Component({
  selector: 'app-vacation-request-summary-item',
  templateUrl: './vacation-request-summary-item.component.html',
  styleUrls: ['./vacation-request-summary-item.component.css']
})
export class VacationRequestSummaryItemComponent implements OnInit {

  constructor(
    private readonly vacationService: VacationService, 
    private readonly router: Router) {}

  ngOnInit(): void {
  }

  get vacationRequest(): Vacation{
    return this.vacationService.savedVacation;
  }

  get isLoading(): boolean{
    return this.vacationService.loading;
  }

  backToDashboard(){
    this.router.navigateByUrl("/calendar")
  }

}
