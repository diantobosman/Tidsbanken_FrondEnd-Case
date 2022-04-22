import { Component, Input, OnInit } from '@angular/core';
import { Vacation } from 'src/app/models/vacation.model';

@Component({
  selector: 'app-vacation-request-item',
  templateUrl: './vacation-request-item.component.html',
  styleUrls: ['./vacation-request-item.component.css']
})
export class VacationRequestItemComponent implements OnInit {

  @Input() vacation! : Vacation;

  constructor() { }

  ngOnInit(): void {
  }


}
