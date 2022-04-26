import { Component, OnInit } from '@angular/core';
import { Vacation } from 'src/app/models/vacation.model';
import { VacationService } from 'src/app/services/vacation.service';
import { DatePipe } from '@angular/common'
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  providers: [DatePipe]
})
export class HistoryComponent implements OnInit {

  vacationsList: Vacation[] = [];

  constructor(
    private readonly vacationService: VacationService,
    private readonly router: Router,
    private datePipe: DatePipe) {
   }

  ngOnInit(): void {
    this.vacationService.getVacationByEmployeeId();
  }

  //Getters
  get vacations(): Vacation[]{
    return this.vacationService.ownVacations.reverse();
  }

  get isLoading(): boolean{
    return this.vacationService.loading;
  }
  
  // Navigate to vacation request details page
  goToVacationUpdate(vacation: Vacation){
    this.router.navigateByUrl("vacation-request", { state: { vacation } } )
  }

  goToVacationSummary(vacation: Vacation){
    this.router.navigateByUrl("vacation-request-summary", { state: { vacation } } )
  }

  //Get vacation by id on a click
  getVacationByID(){
    console.log("get by id works");
    this.vacationService.getVacationByID(3);
  }

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }

  //Delete vacation by id on a click
  deleteVacationById(vacationId: number){
    console.log(vacationId);
    this.vacationService.deleteVacationById(vacationId);
    window.location.reload();
  }

}

