import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { VacationService } from 'src/app/services/vacation.service';
@Component({
  selector: 'app-new-vacation',
  templateUrl: './new-vacation.component.html',
  styleUrls: ['./new-vacation.component.css'],
  providers: [DatePipe]
})
export class NewVacationComponent {

  public error: boolean = false;
  
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
    const { comment } = newRequest.value;

  const newVacation = {
    title: title,
    periodStart: start,
    periodEnd: end,
    comments: comment 
  };
    
    // check if title and periods are empty
      if(newVacation.title == 0 || newVacation.periodStart == undefined || newVacation.periodEnd == undefined){
        this.error = true;
      }
      else{
      this.error = false;
      this.vacationService.saveNewVacation(newVacation);
      alert("New vacation request successfully saved!") 
    }
  }
}
