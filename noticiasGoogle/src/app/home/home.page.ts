import { PreloadImageComponent } from './../customModels/preload-image/preload-image.component';
import { NoticiaCommunicationService } from './../providers/noticia-communication.service';
import { NoticiaPage } from './../noticia/noticia.page';
import { ComunicationService } from './../providers/comunication.service';
import { CustomLoadingModule } from './../customModels/custom-loading/custom-loading.module';
import { GoogleDataService } from './../providers/google-data.service';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable} from 'rxjs';
import { Vibration } from '@ionic-native/vibration/ngx';
import { AppComponent } from './../app.component';
import { NavController, ModalController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { environment } from 'src/environments/environment';
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
    private translate: TranslateService,
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
  console.log('Loco del coco');
})


}
ionViewDidEnter() {
  // This is the default request, invoked when there's not a custom request
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
  // Refresh home.ts with the custom request
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
// Tiny vibration
vibrate(){
  this.vibration.vibrate(30);
}
// Opens the clicked new
dimeHola(e){
  this.vibrate();
  this.miNoticiaService.noticia = e;
  this.nav.navigateForward('/noticia');
}
}