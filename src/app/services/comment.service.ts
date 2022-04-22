import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { StorageUtil } from 'src/app/utils/storage.util';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

const {APIURL} = environment;
const token = StorageUtil.storageRead(StorageKeys.AuthKey);

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private readonly http: HttpClient) { }


  //Save comment with requestId and comment
  public saveComment(requestId: number, comment: any): void {

    const headers = new HttpHeaders ({
      "Accept": "*/*",
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      })

      this.http.post(`${APIURL}request/${requestId}/comment/add`, JSON.stringify(comment), {headers}).
      subscribe({
        next: () => {
          console.log('comment succesfully saved')
        },
        error:(error: HttpErrorResponse) => {
          console.log(error.message);
        }
      })

  }
}
