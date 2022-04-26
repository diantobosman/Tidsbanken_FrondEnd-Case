import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { VacationService } from 'src/app/services/vacation.service';
import { Router } from '@angular/router';
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
    private datePipe: DatePipe,
    private readonly router: Router
  ) {}

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  //Submit form and save to database
  newRequestSubmit(newRequest: NgForm): void | undefined {
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

    this.saveNewRequest(newVacation);
  }

  //Call service and save to database
  saveNewRequest(request: any) {
      // check if title and periods are empty
      if(request.title == 0 || request.periodStart == undefined || request.periodEnd == undefined){
        this.error = true;
      }
      else{
      this.error = false;
      this.vacationService.saveNewVacation(request);
      this.router.navigateByUrl('vacation-new-request-summary')
    }
  }
}
