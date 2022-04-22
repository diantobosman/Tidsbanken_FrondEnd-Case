import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Vacation } from '../models/vacation.model';
import { StorageUtil } from '../utils/storage.util';

const {APIURL} = environment;
const token = StorageUtil.storageRead(StorageKeys.AuthKey);

@Injectable({
  providedIn: 'root'
})

export class VacationService {

  private _vacationById?: Vacation;
  private _isLoading: boolean = false;
  private _vacations: Vacation[] = [];
  private _error: any = '';
  
  constructor(private readonly http: HttpClient) {}

  get vacations(){
    return this._vacations;
  }

  get vacationById(){
    return this._vacationById;
  }

  get isLoading(){
    return this._isLoading;
  }

  // Fetch all vacations
  public getAllVacations() : void {

    if(this._isLoading == false){
      return;
    }

    this._isLoading = true;
    const headers = new HttpHeaders ({
      "Accept": "*/*",
      "Authorization": `Bearer ${token}`
      })

    this.http.get<Vacation[]>(`${APIURL}vacation_request/`, {headers})
    .pipe(
        finalize(() => this._isLoading = false)
      )
      .subscribe({
        next: (vacations: Vacation[]) => {
          this._vacations = vacations;
        }
      })
  }

  // Fetch the vacations by vacationId
  public getVacationByID(vacationId: number): void {

    if(this._vacationById || this._isLoading){
      return
    }

    const headers = new HttpHeaders ({
      "Accept": "*/*",
      "Authorization": `Bearer ${token}`
      })

    this._isLoading = true;

    this.http.get<Vacation>(`${APIURL}vacation_request/${vacationId}`, {headers})
    .pipe(
      map((response: any) => response),

      //finalize(() => this._isLoading = false)
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

  //Save a new Vacation request to the database
  public saveNewVacation(vacation: any): void {


    const headers = new HttpHeaders ({
      "Accept": "*/*",
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      })

      this.http.post<Vacation>(`${APIURL}vacation_request/create`, JSON.stringify(vacation), {headers})
  }

  //Update an existing vacation request and save it to the database
  public updateVacation(vacation: any): void{
    
    const headers = new HttpHeaders ({
      "Accept": "*/*",
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      })
  }

  // Delete vacation by id
  public deleteVacationById(vacationId: number): void {

    const headers = new HttpHeaders ({
      "Accept": "*/*",
      "Authorization": `Bearer ${token}`
      })

    this.http.delete<Vacation>(`${APIURL}vacation_request/delete/${vacationId}`, {headers})
    .subscribe({
        next: () =>{
          //alert
          console.log(`vacation with id ${vacationId} deleted`);
        },
        error:(error: HttpErrorResponse) => {
          this._error = error.message;
        }
      }
    )
  }
}
