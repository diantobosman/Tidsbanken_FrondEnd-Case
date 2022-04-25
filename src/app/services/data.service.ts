import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  dataEmitter = new EventEmitter<any>();

  raiseDataEmitterEvent(data: any){
    this.dataEmitter.emit(data);
  }

  constructor() { }
}
