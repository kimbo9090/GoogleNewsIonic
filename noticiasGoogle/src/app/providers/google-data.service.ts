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
}
// Only for testing 
 getRemoteData(){
   let url ='https://newsapi.org/v2/top-headlines?country=us&q=sadsadsa'+this.apiKey;
   return this.http.get(url)
 }
getDataFilteredByCountry(country){
  let url = 'https://newsapi.org/v2/top-headlines?country='+country+this.apiKey;
  return this.http.get(url);
}


}
