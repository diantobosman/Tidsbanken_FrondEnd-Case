import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/employee.model';
import { RequestComment } from 'src/app/models/request-comment.model';
import { Vacation } from 'src/app/models/vacation.model';

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
  vacationComments: RequestComment[] = [];

  constructor(private datePipe: DatePipe) { }

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

  saveChangesSubmit(_updateVacationRequestForm: NgForm){
    const  start  = this.datePipe.transform(this.range.value.start , 'yyyy-MM-ddT00:00:00.000Z');
    const  end  = this.datePipe.transform(this.range.value.end , 'yyyy-MM-ddT00:00:00.000Z');

    this._newVacation = {
      title: this.vacationTitle,
      periodStart: start,
      periodEnd: end,
      comment: this.vacationComments
    }

    console.log(this.vacation);
    console.log(this._newVacation);

  }

}
