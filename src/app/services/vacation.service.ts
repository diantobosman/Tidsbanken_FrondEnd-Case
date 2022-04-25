import { Employee } from 'src/app/models/employee.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Vacation } from '../models/vacation.model';
import { StorageUtil } from '../utils/storage.util';
import { CommentService } from './comment.service';
import { EmployeeService } from './employee.service';

const {APIURL} = environment;


@Injectable({
  providedIn: 'root'
})

export class VacationService {

  private _vacationById?: Vacation;
  private _loading: boolean = false;
  private _vacations: Vacation[] = [];
  private _ownVacations: Vacation[] = [];
  private _error: any = '';
  private _savedVacation!: Vacation;
  private _updatedVacation!: Vacation;
  private _token?: string = "";
  private _employeeId?: string = "";
  
  constructor(
    private readonly http: HttpClient, 
    private readonly commentService: CommentService,
    private readonly employeeService: EmployeeService) {
      this._token = StorageUtil.storageRead(StorageKeys.AuthKey);
      this._employeeId = StorageUtil.storageRead(StorageKeys.UserId);
    }

  get vacations (){
    return this._vacations;
  }

  get ownVacations (){
    return this._ownVacations;
  }

  get vacationById (){
    return this._vacationById;
  }

  get loading (){
    return this._loading;
  }

  get error() {
    return this._error;
  }

  get savedVacation(){
    return this._savedVacation;
  }

  // Fetch all vacations
  public getAllVacations() : void {

    this._loading = true;
    const headers = new HttpHeaders ({
      "Accept": "*/*",
      "Authorization": `Bearer ${this._token}`
      })

    this.http.get<Vacation[]>(`${APIURL}vacation_request/`, {headers})
    .pipe(
        finalize(() => this._loading = false)
      )
      .subscribe({
        next: (vacations: Vacation[]) => {
          this._vacations = vacations;
        }
      })
  }

  // Fetch all vacations of an employee
  public getVacationByEmployeeId(): void{

    const headers = new HttpHeaders ({
      "Accept": "*/*",
      "Authorization": `Bearer ${this._token}`
      })

      this._loading = true;

      this.http.get<Vacation[]>(`${APIURL}employee/${this._employeeId}/requests?limit=50`, {headers})
      .pipe(
        finalize(() => this._loading = false)
      )
      .subscribe({
        next: (vacations: Vacation[]) => {
          this._ownVacations = [];
          vacations.forEach((vacation) => {
            this.employeeService.getEmployeeById(vacation.requestOwner.toString()).subscribe(
              employee =>{
                vacation.requestOwner = employee;
              }
            )
            this.commentService.getComments(vacation.requestId).subscribe(
              comments =>{
                vacation.comment = comments
              }
            )
            this._ownVacations.push(vacation);
          })
        }
      })
  }

  // Fetch the vacations by vacationId
  public getVacationByID(vacationId: number): void {

    if(this._vacationById || this._loading){
      return
    }

    const headers = new HttpHeaders ({
      "Accept": "*/*",
      "Authorization": `Bearer ${this._token}`
      })

    this._loading = true;

    this.http.get<Vacation>(`${APIURL}vacation_request/${vacationId}`, {headers})
    .pipe(
      map((response: any) => response),
      finalize(() => this._loading = false)
    )
    .subscribe({
        next: (vacation: Vacation) =>{
          this._vacationById = vacation;
          console.log(this._vacationById);
        },
        error:(error: HttpErrorResponse) => {
          this._error = error.message;
        }
      }
    )
  }

  //Save a new vacation request to the database
  public saveNewVacation(vacation: any): void {

    this._loading = true;

    const headers = new HttpHeaders ({
      "Accept": "*/*",
      "Authorization": `Bearer ${this._token}`,
      "Content-Type": "application/json",
      })

    const comment = {
        message: vacation.comments
      }

     this.http.post<Vacation>(`${APIURL}vacation_request/create`, JSON.stringify(vacation), {headers})
     .pipe(
       finalize(() => this._loading = false)
     )
     .subscribe({
      next: (response: Vacation) => {
        if(comment.message.length != 0){
          this.commentService.saveComment(response.requestId, comment);
        }
        this._savedVacation = response;
      },
      error:(error: HttpErrorResponse) => {
        console.log(error.message);
      }
    })
  }

    //Update vacation request to the database
    public updateVacation(vacation: any): void {

      this._loading = true;
  
      const headers = new HttpHeaders ({
        "Accept": "*/*",
        "Authorization": `Bearer ${this._token}`,
        "Content-Type": "application/json",
        })
  
      const comment = {
          message: vacation.comments
        }
  
       this.http.post<Vacation>(`${APIURL}vacation_request/update/${vacation.requestId}`, JSON.stringify(vacation), {headers})
       .pipe(
         finalize(() => this._loading = false)
       )
       .subscribe({
        next: (response: Vacation) => {
          if(comment.message.length != 0){
            this.commentService.saveComment(vacation.requestId, comment);
          }
          this._updatedVacation = response;
        },
        error:(error: HttpErrorResponse) => {
          console.log(error.message);
        }
      })
    }

  // Delete vacation by id
  public deleteVacationById(vacationId: number): void {

    const headers = new HttpHeaders ({
      "Accept": "*/*",
      "Authorization": `Bearer ${this._token}`
      })

    this.http.delete<Vacation>(`${APIURL}vacation_request/delete/${vacationId}`, {headers})
    .subscribe({
        next: () =>{
          //alert
          alert(`vacation with id ${vacationId} deleted`);
        },
        error:(error: HttpErrorResponse) => {
          this._error = error.message;
        }
      }
    )
  }
}
