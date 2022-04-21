import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Vacation } from 'src/app/models/vacation.model';
import { VacationService } from 'src/app/services/vacation.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  private _vacations: Vacation[] = [];

  constructor(private readonly vacationService: VacationService) {
   }

  ngOnInit(): void {
    console.log("init called");
    this._vacations = this.vacations;
  }

  get vacations(): Vacation[]{
    console.log("get called");
    this.vacationService.getAllVacations().
    subscribe({
        next: (vacations: Vacation[]) => {
          this._vacations = vacations;
          
        },
        error:(error: HttpErrorResponse) => {
          console.log(error.message);
        }
      }
    )
    return this._vacations;
  }

  get isLoading(): boolean{
    return this.vacationService.isLoading;
  }

  //Get vacation by id on a click
  getVacationByID(){
    console.log("get by id works");
    this.vacationService.getVacationByID(3);
  }

  //Delete vacation by id on a click
  deletVacationById(){
    console.log("delete works");
    this.vacationService.deleteVacationById(3);
  }

}