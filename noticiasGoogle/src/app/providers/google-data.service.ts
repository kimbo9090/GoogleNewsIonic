import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoogleDataService {

  constructor(public http: HttpClient) {
}
 getRemoteData(){
   let url ='https://newsapi.org/v2/top-headlines?country=us&apiKey=06645691b556476499396c0d93a8b141';
   return this.http.get(url);
 }


}
