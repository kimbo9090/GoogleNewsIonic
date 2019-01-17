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
  nnoticias=-1;
  constructor(public menu:AppComponent,
    private loading: CustomLoadingModule,
    public googleService: GoogleDataService,
    private mycomm:ComunicationService){
      this.mycomm.getMessage().subscribe((m)=>{
        console.log("Estoy en la pagina y recibo "+m);
        if(m==0){
         // this.updateInfo();
        }
      })
}
ngOnInit() { }
ionViewWillEnter() {
  
  this.loading.show("");
  this.noticias = this.googleService.getRemoteData();
  //Always declare subscribes this way.
  //It allows access variable outside the function.
  //Also allows program more lines of code with data
  this.noticias.subscribe((data) => {
    this.nnoticias=data.totalResults
    data.articles.forEach((e) => {
      this.noticiasx.push(e);
    });
    this.loading.hide();
  });
}
}