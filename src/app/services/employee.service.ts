import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Employee } from '../models/employee.model';
import { StorageUtil } from '../utils/storage.util';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  private _employee?: Employee;

  get employee(): Employee | undefined {
    return this._employee;
  }

  set employee(employee: Employee | undefined) {
    StorageUtil.storageSave<Employee>(StorageKeys.Employee, employee!)
    this._employee = employee;
  }

  constructor() { 
    this.employee = StorageUtil.storageRead<Employee>(StorageKeys.Employee);
  }
}