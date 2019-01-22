import { ComunicationService } from './providers/comunication.service';
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController } from '@ionic/angular';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  customReponse = {"pais":'' ,"categoria":'',"palabraClave":''};
  clave:any="";

  constructor(
    public menuCtrl: MenuController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private mycomm:ComunicationService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
 menuClosed(){
   this.customReponse["palabraClave"] = this.clave;
   this.mycomm.sendMessage(this.customReponse);
 }
 actualizaPais(e){
   this.customReponse["pais"]= e.detail.value
 }
 actualizaCategoria(e){
  this.customReponse["categoria"]= e.detail.value
}

}
