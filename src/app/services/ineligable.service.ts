import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Ineligable } from '../models/ineligable.model';
import { StorageUtil } from '../utils/storage.util';

const {APIURL} = environment;
const token = StorageUtil.storageRead(StorageKeys.AuthKey);

@Injectable({
  providedIn: 'root'
})
export class IneligableService {

  private _ineligableById?: Ineligable;
  private _isLoading: boolean = false;
  private _error: any = '';

  constructor(
    private readonly http: HttpClient
  ) { }

  //-- Get all Ineligable periods
  public getAllIneligable(): Observable<Ineligable[]> {
    
    const headers = new HttpHeaders ({
      "Accept": "*/*",
      "Authorization": `Bearer ${token}`
    })

    this._isLoading = true;

    return this.http.get<Ineligable[]>(`${APIURL}ineligibleperiod/all`, {headers})
    .pipe(
      map((response: any) => response),
      finalize(() => this._isLoading = false)
    )
  }

  //-- Get Ineligable period by ID
  public getIneligableById(ineligableId: number): void {

    const headers = new HttpHeaders ({
      "Accept": "*/*",
      "Authorization": `Bearer ${token}`
    })

    this.http.get<Ineligable>(`${APIURL}ineligibleperiod/${ineligableId}`, {headers})
    .pipe(
      map((response:  any) => response),
    )
    .subscribe({
      next: (ineligable: Ineligable) => {
        this._ineligableById = ineligable;
      },
      error: (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    })
  }

  //-- Save new ineligable period
  public saveNewIneligable(ineligable: any): void {

    const headers = new HttpHeaders ({
      "Accept": "*/*",
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      })

      this.http.post(`${APIURL}ineligibleperiod/create`, JSON.stringify(ineligable), {headers})
      .subscribe({
        next: () => {
          //alert
          console.log('succesfully saved')
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      })
  }


  //-- Delete Ineligable period by ID
  public deleteIneligable(ineligableId: number): void {

    const headers = new HttpHeaders ({
      "Accept": "*/*",
      "Authorization": `Bearer ${token}`
    })

    this.http.delete<Ineligable>(`${APIURL}ineligibleperiod/delete/${ineligableId}`, {headers})
    .subscribe({
      next: () => {
        //alert
        console.log(`ineligable period with id ${ineligableId} deleted`);
      },
      error: (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    })
  }

}
