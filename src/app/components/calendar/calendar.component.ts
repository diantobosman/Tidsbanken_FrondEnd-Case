import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import { Employee } from 'src/app/models/employee.model';
import { Ineligible } from 'src/app/models/ineligible.model';
import { VacationService } from '../../services/vacation.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { IneligibleDialogComponent } from '../ineligible-dialog/ineligible-dialog.component';
import { Vacation } from 'src/app/models/vacation.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {

  @Input() vacations: any[] = [];

  @Input() ineligibles: any[] = [];

  private _eventArray: any[] = [];

  public vacation!: Vacation;


  get employee(): Employee | undefined {
    return this.employeeService.employee
  }
  
  constructor(
    private readonly router: Router,
    private readonly employeeService: EmployeeService,
    private readonly vacationService: VacationService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    //loop through vacations to make it into events
    this.vacations.forEach((event: Vacation) => {
      if (event.status === "APPROVED") {
        this._eventArray.push({
          id: event.requestId,
          allDay: true,
          color: '#198754',
          end: event.periodEnd,
          start: event.periodStart,
          title: event.title,
        })
      } else if (event.status === "DENIED") {
        this._eventArray.push({
          id: event.requestId,
          allDay: true,
          color: '#DC3545',
          end: event.periodEnd,
          start: event.periodStart,
          title: event.title,
        })
      } else {
        this._eventArray.push({
          id: event.requestId,
          allDay: true,
          textColor: '#FFFFFF',
          color: '#6C757D',
          end: event.periodEnd,
          start: event.periodStart,
          title: event.title,
        })
      }
    })

    //loop through ineligibles to make it into events
    this.ineligibles.forEach((event: Ineligible) => {
      this._eventArray.push({
        title: "Ineligable period",
        start: event.periodStart,
        end: event.periodEnd,
        color: 'black'
      })
    })
  }

  calendarOptions: CalendarOptions = {
    headerToolbar: {start: 'title prevYear,nextYear', center: '', end: 'today prev,next'},
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    eventClick: this.handleEventClick.bind(this),
    weekNumbers: true,
    events: this._eventArray,
    firstDay: 1
  };

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr)
  }

  handleEventClick(info: any) {
    this.vacationService.getVacationByID(info.event.id); //gaat maar 1x

    setTimeout( () => {
      this.vacation = this.vacationService.vacationById;
      this.redirect(this.vacation)
    }, 500);
  }


  public redirect(vacation: Vacation) {
    this.router.navigateByUrl("vacation-request-summary",{ state: { vacation }})
  }

  public navigateToNewRequest() {
    this.router.navigateByUrl("/create-vacation")
  }

  public openDialogIneligible() {
    this.dialog.open(IneligibleDialogComponent);
  }


}
