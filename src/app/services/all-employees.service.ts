import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enum';
import { StorageUtil } from '../utils/storage.util';

@Injectable({
  providedIn: 'root'
})
export class AllEmployeesService {

  private _employees?: any;

  //-- Getter
  get employees(): any {
    return this._employees;
  }

  //-- Setter
  set employees(employees) {
    StorageUtil.storageSave(StorageKeys.Employees, employees);
    this._employees = employees;
  }

  constructor() {
    this.employees = StorageUtil.storageRead(StorageKeys.Employees);
  }
}
