import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-vacation',
  templateUrl: './new-vacation.component.html',
  styleUrls: ['./new-vacation.component.css']
})
export class NewVacationComponent {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
}
