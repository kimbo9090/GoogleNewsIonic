import { GoogleDataService } from './../providers/google-data.service';
import { Component } from '@angular/core';
import { Observable} from 'rxjs';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  noticias: Observable<any>;


  constructor(public googleService: GoogleDataService){
    this.noticias = this.googleService.getRemoteData();
    this.noticias.subscribe( data => {
      console.log('My data',data);
    })
  }
openDetails(noticia){
  console.log('3');
}
 
  

}
