import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vacation } from 'src/app/models/vacation.model';
import { VacationService } from 'src/app/services/vacation.service';

@Component({
  selector: 'app-vacation-new-request-summary-item',
  templateUrl: './vacation-new-request-summary-item.component.html',
  styleUrls: ['./vacation-new-request-summary-item.component.css']
})
export class VacationNewRequestSummaryItemComponent implements OnInit {

  constructor(    
    private readonly vacationService: VacationService, 
    private readonly router: Router,) { }

  ngOnInit(   ): void {
  }

  get vacationRequest(): Vacation{
    console.log(this.vacationService.savedVacation);
    return this.vacationService.savedVacation;
  }

  get isLoading(): boolean{
    return this.vacationService.loading;
  }

  backToHistory(){
    this.router.navigateByUrl("vacation-history")
  }

}
