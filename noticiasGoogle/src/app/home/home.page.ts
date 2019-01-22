import { ComunicationService } from './../providers/comunication.service';
import { CustomLoadingModule } from './../customModels/custom-loading/custom-loading.module';
import { GoogleDataService } from './../providers/google-data.service';
import { Component } from '@angular/core';
import { Observable} from 'rxjs';
import { resolve } from 'url';
import { AppComponent } from './../app.component';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  comandos;
  noticias: Observable<any>;
  noticiasx=[];
  change = 0;
  pais;
  categoria;
  palabra;
  nnoticias=-1;
  constructor(public menu:AppComponent,
    private loading: CustomLoadingModule,
    public googleService: GoogleDataService,
    private mycomm:ComunicationService){
      this.mycomm.getMessage().subscribe((m)=>{
        console.log('He recibido', m)
        this.pais = m['pais'];
        this.categoria = m['categoria'];
        this.palabra = m['palabraClave'];
        this.doRefresh(event);
      })
}
ngOnInit() { }
ionViewDidEnter() {
  this.loading.show("");
  this.noticias = this.googleService.getRemoteData();
  this.noticiasx = [];
  this.noticias.subscribe((data) => {
    this.nnoticias=data.totalResults
    data.articles.forEach((e) => {
      this.noticiasx.push(e);
    });
    this.loading.hide();
  });
}

doRefresh(event){
  this.loading.show("");
  this.noticias = this.googleService.getDataFilteredByCountry(this.pais,this.categoria,this.palabra);
  this.noticiasx = [];
  this.noticias.subscribe((data) => {
    this.nnoticias=data.totalResults
    data.articles.forEach((e) => {
      this.noticiasx.push(e);
    });
    this.loading.hide();
    console.log('SADSADSADSA');
    event.target.complete();
    console.log('SADSADSAD222222SA');

  });
}
}