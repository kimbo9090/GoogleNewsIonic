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
  datosLocos: any;

  constructor(public googleService: GoogleDataService){
    this.noticias = this.googleService.getRemoteData();
    this.noticias.subscribe(data => 
      console.log('Json stringify',JSON.stringify(data['totalResults']))
      
      );



    this.noticiasFiltradas = this.googleService.getDataFilteredByCountry('ru');
    this.noticiasFiltradas.subscribe((res : Response) => {
      const usersJson: any[] = Array.of(res.json());

    });
       
      
  }

 
  

}
