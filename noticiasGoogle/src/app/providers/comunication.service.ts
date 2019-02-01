import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicationService {
  message=[];
  myobservable;
  myobserver;
// This is a middle service to communicate the aside menu with the
// home page
  constructor() {
    this.myobservable=new Observable((observer)=>{
      this.myobserver=observer;
    });
   }
  sendMessage(m:any){
    if(this.myobservable){
      this.myobserver.next(m);
      //this.myobserver.complete(m);
    }
  }
  getMessage():Observable<any>{
      return this.myobservable;
  }
}
