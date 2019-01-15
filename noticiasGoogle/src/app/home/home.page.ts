import { CustomLoadingModule } from './../customModels/custom-loading/custom-loading.module';
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
  noticiasx=[];
  nnoticias=0;
  constructor(private loading: CustomLoadingModule,public googleService: GoogleDataService){
   
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