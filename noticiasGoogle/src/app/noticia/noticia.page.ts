import { NoticiaCommunicationService } from './../providers/noticia-communication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.page.html',
  styleUrls: ['./noticia.page.scss'],
})
export class NoticiaPage implements OnInit {
  arrayNoticias = [];
  myNoticia = null;
  constructor(private route: ActivatedRoute, 
    private miNoticia : NoticiaCommunicationService) { }

  ngOnInit() {  
      this.arrayNoticias.push(this.miNoticia.noticia);
      console.log(this.arrayNoticias);
      
  }

}
