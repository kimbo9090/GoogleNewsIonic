import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoticiaCommunicationService } from '../providers/noticia-communication.service';
@Component({
  selector: 'app-my-noticia',
  templateUrl: './my-noticia.component.html',
  styleUrls: ['./my-noticia.component.scss']
})
export class MyNoticiaComponent implements OnInit {
  arrayNoticias = [];
  myNoticia = null;
  constructor(private route: ActivatedRoute, 
    private miNoticia : NoticiaCommunicationService) { }

  ngOnInit() {  
    // We save the new in array to easy manipulation on the html
      this.arrayNoticias.push(this.miNoticia.noticia);      
  }
 

}
