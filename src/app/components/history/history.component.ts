import { Component, OnInit } from '@angular/core';
import { Vacation } from 'src/app/models/vacation.model';
import { VacationService } from 'src/app/services/vacation.service';
import { DatePipe } from '@angular/common'
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  providers: [DatePipe]
})
export class HistoryComponent implements OnInit {

  vacationsList: Vacation[] = [];
  showAllVacationRequests: boolean = false;

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly vacationService: VacationService,
    private readonly router: Router,
    private datePipe: DatePipe) {
   }

  ngOnInit(): void {
    this.vacationService.getVacationByEmployeeId();
    this.vacationService.getAllVacations();
  }

  //Getters
  get vacations(): Vacation[]{
    return this.vacationService.ownVacations;
  }

  get isLoading(): boolean{
    return this.vacationService.loading;
  }

  get allVacations(){
      return this.vacationService.vacations;
  }

  get employee(){
    return this.employeeService.employee;
  }

  //Toggle showAllVacationRequests
  toggleShowAllVacationRequests(event: any){
    event.source.value = this.showAllVacationRequests;
  }
  
  // Navigate to vacation request details page
  goToVacationUpdate(vacation: Vacation){
    this.router.navigateByUrl("vacation-request", { state: { vacation } } )
  }

  // Navigate to vacation request summary page
  goToVacationSummary(vacation: Vacation){
    this.router.navigateByUrl("vacation-request-summary", { state: { vacation } } )
  }

  //Delete vacation by id on a click
  deleteVacationById(vacationId: number){
    try{
      this.vacationService.deleteVacationById(vacationId).subscribe(
        {
          next: () => {
            //refresh the page and list
            window.location.reload();
          }
        }
      )
    }catch(error: any){
      console.log(error.message)
    }
  }
}

