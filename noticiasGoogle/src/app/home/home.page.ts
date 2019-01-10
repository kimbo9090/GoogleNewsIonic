import { GoogleDataService } from './../providers/google-data.service';
import { Component } from '@angular/core';
import { Observable} from 'rxjs';
import { resolve } from 'url';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  noticias: Observable<any>;
  noticiasFiltradas: Observable<any>;


  constructor(public googleService: GoogleDataService){
    this.noticias = this.googleService.getRemoteData();
    this.noticias.subscribe(data => console.log('Test JSON',data));



    this.noticiasFiltradas = this.googleService.getDataFilteredByCountry('ru');
    this.noticiasFiltradas.subscribe(datos => console.log('Filtered JSON',datos));
  }

 
  

}
