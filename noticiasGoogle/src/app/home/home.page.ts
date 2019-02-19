import { NewsModuleModule } from './../customModels/news-module/news-module.module';
import { MyNoticiaComponent } from './../my-noticia/my-noticia.component';
import { NoticiaCommunicationService } from "./../providers/noticia-communication.service";
import { ComunicationService } from "./../providers/comunication.service";
import { CustomLoadingModule } from "./../customModels/custom-loading/custom-loading.module";
import { GoogleDataService } from "./../providers/google-data.service";
import { Component } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';
import { Observable } from "rxjs";
import { Vibration } from "@ionic-native/vibration/ngx";
import { AppComponent } from "./../app.component";
import { NavController, ModalController } from "@ionic/angular";
import { Network } from "@ionic-native/network/ngx";
import { environment } from "src/environments/environment"
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  noticias: Observable<any>;
  noticiasx = [];
  pais;
  changeFrontEnd = false;
  disconnected = false;
  categoria;
  palabra;
  nnoticias = -1;
  constructor(
    public modal:NewsModuleModule,
    public menu: AppComponent,
    private translate:TranslateService,
    public nav: NavController,
    public miNoticiaService: NoticiaCommunicationService,
    private net: Network,
    private vibration: Vibration,
    private loading: CustomLoadingModule,
    public googleService: GoogleDataService,
    private mycomm: ComunicationService
  ) {
    // Take the data from the aside menu
    this.mycomm.getMessage().subscribe(m => {
      console.log("He recibido", m);
      this.pais = m["pais"];
      this.categoria = m["categoria"];
      this.palabra = m["palabraClave"];
      this.doRefresh(event);
    });
  }
  ngOnInit() {
    // Subscribes to know when we have connection or not
    // When we don't have connection / loose conection
    let disconect = this.net.onDisconnect().subscribe(() => {
      this.disconnected = true;
      this.doRefresh(event);
    });
    // When we have connection / reconnect
    let connectSubscription = this.net.onConnect().subscribe(() => {
      this.disconnected = false;
      this.doRefresh(event);
    });
  }
  ionViewDidEnter() {
    // This is the default request
    if (!this.disconnected) {
      this.changeFrontEnd = false;
      this.loading.show("");
      this.noticias = this.googleService.getRemoteData();
      this.noticiasx = [];
      this.noticias.subscribe(data => {
        this.nnoticias = data.totalResults;
        data.articles.forEach(e => {
          this.noticiasx.push(e);
        });
        this.loading.hide();
      });
    } else {
      this.changeFrontEnd = true;
    }
  }

  doRefresh(event) {
    // On refresh, do this.
    if (!this.disconnected) {
      this.changeFrontEnd = false;
      this.loading.show("");
      this.noticias = this.googleService.getDataFilteredByCountry(
        this.pais,
        this.categoria,
        this.palabra
      );
      this.noticiasx = [];
      this.noticias.subscribe(data => {
        this.nnoticias = data.totalResults;
        console.log(this.nnoticias);
        data.articles.forEach(e => {
          this.noticiasx.push(e);
        });
        this.loading.hide();
        event.target.complete();
      });
    } else {
      this.changeFrontEnd = true;
      this.loading.hide();

      event.target.complete();
    }
  }
  vibrate() {
    // Tiny vibration
    this.vibration.vibrate(30);
  }
  dimeHola(e) {
    // When a new is clicked, redirect to the specific new 
    this.vibrate();
    this.miNoticiaService.noticia = e;
    this.modal.show(MyNoticiaComponent,this);
  }
}
