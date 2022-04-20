import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vacation } from 'src/app/models/vacation.model';
import { VacationService } from 'src/app/services/vacation.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  get vacations(): Vacation[]{
    return this.vacationService.vacations;
  }

  constructor(private readonly vacationService: VacationService) {
   }

  ngOnInit(): void {
    this.vacationService.getAllVacations();
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