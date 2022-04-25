import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Employee } from '../models/employee.model';
import { StorageUtil } from '../utils/storage.util';

const {APIURL} = environment;

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  private _employee?: Employee;
  private _token?: string = "";

  //-- Getter
  get employee(): Employee | undefined {
    return this._employee;
  }

  //-- Setter
  set employee(employee: Employee | undefined) {
    StorageUtil.storageSave<Employee>(StorageKeys.Employee, employee!)
    this._employee = employee;
  }

  constructor(private readonly http: HttpClient) { 
    this.employee = StorageUtil.storageRead<Employee>(StorageKeys.Employee);
    this._token = StorageUtil.storageRead(StorageKeys.AuthKey);
  }

  public getEmployeeById(employeeId: string): Observable<Employee> {

    const headers = new HttpHeaders ({
      "Accept": "*/*",
      "Authorization": `Bearer ${this._token}`
      })

    return this.http.get<Employee>(`${APIURL}employee/${employeeId}`, {headers});
  }
}