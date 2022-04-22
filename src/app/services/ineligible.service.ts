import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Ineligible } from '../models/ineligible.model';
import { StorageUtil } from '../utils/storage.util';

const {APIURL} = environment;
const token = StorageUtil.storageRead(StorageKeys.AuthKey);

@Injectable({
  providedIn: 'root'
})
export class IneligibleService {

  private _ineligibleById?: Ineligible;
  private _ineligibles: Ineligible[] = [];
  private _loading: boolean = false;
  private _error: any = '';

  constructor(
    private readonly http: HttpClient
  ) { }

  get ineligibles() {
    return this._ineligibles;
  }

  get ineligiblesByID() {
    return this._ineligibleById;
  }

  get loading() {
    return this._loading
  }

  get error() {
    return this._error;
  }

  //-- Get all Ineligable periods
  public getAllIneligible(): void {
    
    const headers = new HttpHeaders ({
      "Accept": "*/*",
      "Authorization": `Bearer ${token}`
    })

    this._loading = true;

    this.http.get<Ineligible[]>(`${APIURL}ineligibleperiod/all`, {headers})
    .pipe(
      map((response: any) => response),
      finalize(() => this._loading = false)
    )
    .subscribe({
      next: (events: any[]) => {
        this._ineligibles = events;
      }
    })
  }

  //-- Get Ineligable period by ID
  public getIneligibleById(ineligibleId: number): void {

    const headers = new HttpHeaders ({
      "Accept": "*/*",
      "Authorization": `Bearer ${token}`
    })

    this._loading = true;

    this.http.get<Ineligible>(`${APIURL}ineligibleperiod/${ineligibleId}`, {headers})
    .pipe(
      map((response:  any) => response),
      finalize(() => this._loading = false)
    )
    .subscribe({
      next: (ineligible: Ineligible) => {
        this._ineligibleById = ineligible;
      },
      error: (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    })
  }

  //-- Save new ineligable period
  public saveNewIneligible(ineligible: any): void {

    const headers = new HttpHeaders ({
      "Accept": "*/*",
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      })

  
      this.http.post<Ineligible>(`${APIURL}ineligibleperiod/create`, JSON.stringify(ineligible), {headers})
      .subscribe({
        next: () => {
          //alert?

        },
        error:(error: HttpErrorResponse) => {
          console.log(error.message);
        }
      })
  }


  //-- Delete Ineligable period by ID
  public deleteIneligible(ineligibleId: number): void {

    const headers = new HttpHeaders ({
      "Accept": "*/*",
      "Authorization": `Bearer ${token}`
    })

    this.http.delete<Ineligible>(`${APIURL}ineligibleperiod/delete/${ineligibleId}`, {headers})
    .subscribe({
      next: () => {
        //alert
        console.log(`ineligible period with id ${ineligibleId} deleted`);
      },
      error: (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    })
  }

}
