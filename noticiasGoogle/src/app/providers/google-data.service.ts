// Request provider.
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class GoogleDataService {
  // The api key will be present in all requests.
  private apiKey = "&apiKey=06645691b556476499396c0d93a8b141";
  constructor(public http: HttpClient) {}
  // Only for testing
  getRemoteData() {
    let url = "https://newsapi.org/v2/top-headlines?country=us" + this.apiKey;
    return this.http.get(url);
  }
  getDataFilteredByCountry(country, category, palabraClave) {
    let newCategory;
    let newPalabraClave;
    // We have to filter the variables in case the are null or empty
    if (country == "" || country == undefined) {
      country = "us";
    }
    if (category == "" || category == undefined) {
      newCategory = "";
    } else {
      newCategory = "&category=" + category;
      console.log("categoria cutsom", newCategory);
    }
    if (palabraClave == "" || palabraClave == undefined) {
      newPalabraClave = "";
    } else {
      newPalabraClave = "&q=" + palabraClave;
      console.log("palabra cutsom", newPalabraClave);
    }
    //We concatenate all in the url
    let url =
      "https://newsapi.org/v2/top-headlines?country=" +
      country +
      newCategory +
      newPalabraClave +
      this.apiKey;
    console.log("LA URL CUSTOM", url);
    return this.http.get(url);
  }
}
