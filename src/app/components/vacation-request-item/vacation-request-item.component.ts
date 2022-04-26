import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/employee.model';
import { Vacation } from 'src/app/models/vacation.model';
import { VacationService } from 'src/app/services/vacation.service';

@Component({
  selector: 'app-vacation-request-item',
  templateUrl: './vacation-request-item.component.html',
  styleUrls: ['./vacation-request-item.component.css'],
  providers: [DatePipe]
})
export class VacationRequestItemComponent implements OnInit {

  @Input() vacation! : Vacation;

  vacationTitle: string = "";
  vacationStartDate: Date = new Date();
  vacationEndDate: Date = new Date();
  vacationModerator?: Employee;
  vacationUpdatedDate?: Date;
  _newVacation: Object = Object;
  vacationComments: any[] = [];
  commentMessage: string = "";

  constructor(
    private datePipe: DatePipe, 
    private readonly vacationService: VacationService,
    private readonly router: Router) { }

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  ngOnInit(): void {
    this.vacationTitle = this.vacation.title;
    this.vacationStartDate = this.vacation.periodStart;
    this.vacationEndDate = this.vacation.periodEnd;
    this.vacationModerator = this.vacation.moderator;
    this.vacationUpdatedDate = this.vacation.dateUpdated;
    this.vacationComments = this.vacation.comment;
  }

  addNewComment(){
      const comment ={
        message: this.commentMessage
      }
      console.log(this.commentMessage.length);
      if(this.commentMessage.length > 0){
        this.vacationComments.push(comment);
      }
  }

  saveChangesSubmit(_updateVacationRequestForm: NgForm){
    const  start  = this.datePipe.transform(this.range.value.start , 'yyyy-MM-ddT00:00:00.000Z');
    const  end  = this.datePipe.transform(this.range.value.end , 'yyyy-MM-ddT00:00:00.000Z');

    this._newVacation = {
      requestId: this.vacation.requestId,
      title: this.vacationTitle,
      periodStart: start,
      periodEnd: end
    }

    try{
      this.vacationService.updateVacation(this._newVacation, this.commentMessage);
      this.commentMessage = "";
      this.router.navigateByUrl("calendar");
    }catch (error: any) {
      
      alert(error.message);
  
    }
    

    

  }

}
