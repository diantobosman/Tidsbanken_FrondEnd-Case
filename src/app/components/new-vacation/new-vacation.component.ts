import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { VacationService } from 'src/app/services/vacation.service';
@Component({
  selector: 'app-new-vacation',
  templateUrl: './new-vacation.component.html',
  styleUrls: ['./new-vacation.component.css'],
  providers: [DatePipe]
})
export class NewVacationComponent {

  
  constructor(
    private readonly vacationService: VacationService,
    private datePipe: DatePipe
  ) {
    
  }

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });


  newRequestSubmit(newRequest: NgForm): void {
    const { title } = newRequest.value;
    const  start  = this.datePipe.transform(this.range.value.start , 'yyyy-MM-ddT00:00:00.000Z');
    const  end  = this.datePipe.transform(this.range.value.end , 'yyyy-MM-ddT00:00:00.000Z'); 

  const newVacation = {
    title: title,
    periodStart: start,
    periodEnd: end
  };
    this.vacationService.saveNewVacation(newVacation);
  }


  
}
