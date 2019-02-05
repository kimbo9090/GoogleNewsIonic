import { PreloadImageComponent } from './../preload-image/preload-image.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular';
@NgModule({
  declarations: [PreloadImageComponent],
  imports: [
    CommonModule
  ]
})
export class NewsModuleModule { 
  public changes = false;

  constructor(public modalCtrl: ModalController,) { }
//Metodo que nos crea el modal de add alert
//recibe el componente add alert, la longitud y latitud y la propia clase donde se llama
  async show(component,callback): Promise <any> {
    
    const modal = await this.modalCtrl.create({
      cssClass: "my-modal",
      backdropDismiss: true,
      component: component,  //El componente que se inyecta en la ventana modal
      componentProps: {} //Los parámetros que se le pasan a la ventana modal
    });
    
    modal.onDidDismiss().then((d) => {

        if (callback.onModalClose)
          callback.onModalClose()
    });
    return await modal.present();
  }

}