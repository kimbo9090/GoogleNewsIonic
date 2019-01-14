// Request provider. 
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoogleDataService {
  // The api key will be present in all requests.
  private apiKey = '&apiKey=06645691b556476499396c0d93a8b141';
  constructor(public http: HttpClient) {
    this.getRemoteData
}
// Only for testing 
 getRemoteData(){
   let url ='https://newsapi.org/v2/top-headlines?country=us&category=sports&q=loco'+this.apiKey;
   console.log('Test url',url);
   return this.http.get(url)
 }
getDataFilteredByCountry(country){
  let url = 'https://newsapi.org/v2/top-headlines?country='+country+this.apiKey;
  console.log('Filtered url',url);
  return this.http.get(url);
}


}
