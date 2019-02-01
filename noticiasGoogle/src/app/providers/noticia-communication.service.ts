import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// This is a middle service to communicate the home page with the
// specific new page
export class NoticiaCommunicationService {
  public noticia:any;
  constructor() { 
    this.noticia = this.noticia;
  }
}
