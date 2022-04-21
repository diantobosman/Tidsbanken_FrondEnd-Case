import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';

import { StorageKeys } from 'src/app/enums/storage-keys.enum';

import { StorageUtil } from 'src/app/utils/storage.util';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {


  constructor(
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {

  }

  calendarOptions: CalendarOptions = {
    headerToolbar: {start: 'title prevYear,nextYear', center: '', end: 'today prev,next'},
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: StorageUtil.storageRead(StorageKeys.Events)
  };

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr)
  }


   public navigateToNewRequest() {
    this.router.navigateByUrl("/create-vacation")
  }


}
