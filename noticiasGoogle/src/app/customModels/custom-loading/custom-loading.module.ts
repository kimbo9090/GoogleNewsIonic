import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingController } from '@ionic/angular';
import { CustomToastModule } from '../customToast/custom-toast.module';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CustomLoadingModule { 
  myloading:any;
  timeout;
  constructor(private loadingController:LoadingController,private toast:CustomToastModule,private translate:TranslateService){
  }
  async show(msg) {
    this.myloading = await this.loadingController.create({
    message:msg,
    spinner: null
    });
    this.timeout=setTimeout(()=>{
      this.myloading.dismiss();
      this.toast.show(this.translate.instant("errorloading"));
      this.myloading.dismiss();
    },environment.timemaxloading);
    await this.myloading.present(); 
  }
  hide(){
    if(this.myloading){
      clearTimeout(this.timeout);
      this.myloading.dismiss();
    }
  }
}
