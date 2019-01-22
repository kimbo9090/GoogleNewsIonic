import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicationService {
  message=[];
  myobservable;
  myobserver;

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
// Cada vez que abrir la aplicacion guardo una fecha
// Comparar con la ultima fecha guardada