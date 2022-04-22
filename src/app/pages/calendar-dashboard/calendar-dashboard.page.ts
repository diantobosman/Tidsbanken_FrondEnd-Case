import { Component, OnInit } from '@angular/core';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { Ineligible } from 'src/app/models/ineligible.model';
import { Vacation } from 'src/app/models/vacation.model';
import { IneligibleService } from 'src/app/services/ineligible.service';
import { VacationService } from 'src/app/services/vacation.service';
import { StorageUtil } from 'src/app/utils/storage.util';

@Component({
  selector: 'app-calendar-dashboard',
  templateUrl: './calendar-dashboard.page.html',
  styleUrls: ['./calendar-dashboard.page.css']
})
export class CalendarDashboardPage implements OnInit {

  get vacations(): Vacation[] {
    return this.vacationService.vacations;
  } 

  get ineligibles(): Ineligible[] {
    return this.ineligibleService.ineligibles;
  }

  get loading(): boolean {
    return this.vacationService.loading;
  }

  get error(): String {
    return this.vacationService.error;
  }

  constructor(
    private readonly vacationService: VacationService,
    private readonly ineligibleService: IneligibleService
  ) { }

  ngOnInit(): void {
    this.vacationService.getAllVacations();
    this.ineligibleService.getAllIneligable();
  }
}
