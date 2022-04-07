import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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


  public navigateToNewRequest() {
    this.router.navigateByUrl("/create-vacation")
  }


}
