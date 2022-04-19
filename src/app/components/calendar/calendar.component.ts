import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import { end } from '@popperjs/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent {

  constructor(
    private readonly router: Router
  ) {
  }

  calendarOptions: CalendarOptions = {
    headerToolbar: {start: 'title prevYear,nextYear', center: '', end: 'today prev,next'},
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [
      { 
        
        title: 'Vacation Savannah', 
        allDay: true,
        start: '2022-04-01',
        end: '2022-04-06',
        url: 'link naar request',
        color: '#005662'
      },
      
    ]
  };

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr)
  }

  

  public navigateToNewRequest() {
    this.router.navigateByUrl("/create-vacation")
  }


}
