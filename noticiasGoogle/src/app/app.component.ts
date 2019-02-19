import { ComunicationService } from './providers/comunication.service';
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController } from '@ionic/angular';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  customReponse = {"pais":'' ,"categoria":'',"palabraClave":''};
  clave:any="";
  

  constructor(
    private translate:TranslateService,
    public menuCtrl: MenuController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private mycomm:ComunicationService
  ) {
    this.initializeApp();
    this.translate.addLangs(environment.currentLanguages);  //add all languages
    this.translate.setDefaultLang(environment.defaultLanguage); //use default language
    if (this.translate.getBrowserLang) {  //if browsers's language is avalaible is set up as default
      if (environment.currentLanguages.includes(this.translate.getBrowserLang())) {
        this.translate.use(this.translate.getBrowserLang());
      }
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // The information will be send when we close the menu
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
  enterCloseMenu(){
    this.menuCtrl.close();
  }

}
