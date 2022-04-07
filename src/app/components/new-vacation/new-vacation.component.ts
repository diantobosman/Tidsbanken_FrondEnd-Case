import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { VacationService } from 'src/app/services/vacation.service';

@Component({
  selector: 'app-new-vacation',
  templateUrl: './new-vacation.component.html',
  styleUrls: ['./new-vacation.component.css']
})
export class NewVacationComponent {

  constructor(
    private readonly vacationService: VacationService
  ) {
    
  }

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  
}
