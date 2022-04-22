import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import { Employee } from 'src/app/models/employee.model';
import { Ineligible } from 'src/app/models/ineligible.model';
import { Vacation } from 'src/app/models/vacation.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { IneligibleDialogComponent } from '../ineligible-dialog/ineligible-dialog.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {

  @Input() vacations: any[] = [];

  @Input() ineligibles: any[] = [];

  private _eventArray: any[] = [];

  get employee(): Employee | undefined {
    return this.employeeService.employee
  }
  
  constructor(
    private readonly router: Router,
    private readonly employeeService: EmployeeService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    //loop through vacations to make it into events
    this.vacations.forEach((event: Vacation) => {
      if (event.status === "APPROVED") {
        this._eventArray.push({
          allDay: true,
          color: '#239B56',
          end: event.periodEnd,
          start: event.periodStart,
          title: event.title,
          url: 'link naar request',
        })
      } else if (event.status === "DENIED") {
        this._eventArray.push({
          allDay: true,
          color: '#7B241C',
          end: event.periodEnd,
          start: event.periodStart,
          title: event.title,
          url: 'link naar request',
        })
      } else {
        this._eventArray.push({
          allDay: true,
          textColor: '#17202A',
          backgroundColor: '#CACFD2',
          borderColor: '#239B56',
          end: event.periodEnd,
          start: event.periodStart,
          title: event.title,
          url: 'link naar request', // of eventclick?
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
    weekNumbers: true,
    events: this._eventArray,
    firstDay: 1
  };

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr)
  }


  public navigateToNewRequest() {
    this.router.navigateByUrl("/create-vacation")
  }

  public openDialogIneligible() {
    this.dialog.open(IneligibleDialogComponent);
  }


}
