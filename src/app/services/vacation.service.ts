import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../enums/storage-keys.enum';
import { User } from '../models/user.model';
import { Vacation } from '../models/vacation.model';
import { StorageUtil } from '../utils/storage.util';
import { UserService } from './user.service';

const {APIURL} = environment;
const token = StorageUtil.storageRead(StorageKeys.AuthKey);

@Injectable({
  providedIn: 'root'
})

export class VacationService {

  private _vacationById?: Vacation;
  private _user?: User;
  private _isLoading: boolean = false;
  private _vacations: Vacation[] = [];
  private _error: any = '';
  
  constructor( private readonly userService: UserService, private readonly http: HttpClient
  ) {
    this._user = userService.user;
   }

  get vacations(){
    return this._vacations;
  }

  get vacationById(){
    return this._vacationById;
  }

  // Fetch all vacations
  public getAllVacations(){

    if(this._isLoading || !this._user){
      return
    }

    const headers = new HttpHeaders ({
      "Accept": "*/*",
      "Authorization": `Bearer ${token}`
      })

    this._isLoading = true;

    this.http.get<Vacation>(`${APIURL}vacation_request/`, {headers}).
    pipe(
      map((response: any) => response),
      finalize(() => this._isLoading = false)
    ).
    subscribe({
        next: (vacations: Vacation[]) =>{
          this._vacations = vacations;
          console.log(this._vacations);
        },
        error:(error: HttpErrorResponse) => {
          this._error = error.message;
        }
      }
    )
  }

  // Fetch the vacations by vacationId
  public getVacationByID(vacationId: number): void {

    // if(this._vacationById || this._isLoading){
    //   return
    // }

    const headers = new HttpHeaders ({
      "Accept": "*/*",
      "Authorization": `Bearer ${token}`
      })

  //  this._isLoading = true;

    this.http.get<Vacation>(`${APIURL}vacation_request/${vacationId}`, {headers}).
    pipe(
      map((response: any) => response),
      //finalize(() => this._isLoading = false)
    ).
    subscribe({
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

  // Delete vacation by id
  deleteVacationById(vacationId: number) {

    const headers = new HttpHeaders ({
      "Accept": "*/*",
      "Authorization": `Bearer ${token}`
      })

    this.http.delete<Vacation>(`${APIURL}vacation_request/delete/${vacationId}`, {headers}).
    subscribe({
        next: () =>{
          console.log(`vacation with id ${vacationId} deleted`);
        },
        error:(error: HttpErrorResponse) => {
          this._error = error.message;
        }
      }
    )
  }
}
  // Patch the vacations certain employee


  // Store the fetched vacation
  // set vacation(vacation: Vacation | undefined) {
  //   this._vacation = vacation;
  //  }

  // Get the fetched vacations
  // get vacation(): Vacation | undefined {
  //   return this._vacation;
  // }
