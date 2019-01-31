import { PreloadImageComponent } from './../customModels/preload-image/preload-image.component';
import { NoticiaCommunicationService } from './../providers/noticia-communication.service';
import { NoticiaPage } from './../noticia/noticia.page';
import { ComunicationService } from './../providers/comunication.service';
import { CustomLoadingModule } from './../customModels/custom-loading/custom-loading.module';
import { GoogleDataService } from './../providers/google-data.service';
import { Component } from '@angular/core';
import { Observable} from 'rxjs';
import { Vibration } from '@ionic-native/vibration/ngx';
import { AppComponent } from './../app.component';
import { NavController, ModalController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  comandos;
  miNoticia : NoticiaPage;
  noticias: Observable<any>;
  noticiasx=[];
  didLoad = false;
  change = 0;
  pais;
  categoria;
  palabra;
  nnoticias=-1;
  constructor(public menu:AppComponent,
    public nav: NavController,
    public miNoticiaService:NoticiaCommunicationService,
    private net: Network,
    private vibration: Vibration,
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
ngOnInit() { 
let disconect = this.net.onDisconnect().subscribe(() => {
  console.log('Desconexión');
})


}
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
    this.nnoticias=data.totalResults;
    console.log(this.nnoticias);
    data.articles.forEach((e) => {
      this.noticiasx.push(e);
    });
    this.loading.hide();
    event.target.complete();

  });
}
vibrate(){
  this.vibration.vibrate(30);
}
dimeHola(e){
  this.vibrate();
  this.miNoticiaService.noticia = e;
  this.nav.navigateForward('/noticia');
}










}