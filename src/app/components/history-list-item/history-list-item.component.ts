import { Component, Input } from '@angular/core';
import { Vacation } from 'src/app/models/vacation.model';

@Component({
  selector: 'app-history-list-item',
  templateUrl: './history-list-item.component.html',
  styleUrls: ['./history-list-item.component.css']
})
export class HistoryListItemComponent{

  @Input() vacation? : Vacation;

  constructor() { }

}
