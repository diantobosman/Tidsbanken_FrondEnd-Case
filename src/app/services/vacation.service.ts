import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Employee } from '../models/employee.model';
import { Vacation } from '../models/vacation.model';
import { StorageUtil } from '../utils/storage.util';

const testVacation: Vacation= {
  requestId:  1,
  dateCreated: new Date(),
  dateUpdated: new Date(),
  periodStart: new Date(),
  periodEnd: new Date(),
  status: 'Accepted',
  title: 'Holiday'
}

@Injectable({
  providedIn: 'root'
})

export class VacationService {
  private _vacation?: Vacation;

  constructor(
  ) {
    this._vacation = testVacation;
   }

  // Fetch the vacations certain employee

  // Patch the vacations certain employee


  // Store the fetched vacation
  set vacation(vacation: Vacation | undefined) {
    this._vacation = vacation;
   }

  // Get the fetched vacations
  get vacation(): Vacation | undefined {
    return this._vacation;
  }
}
