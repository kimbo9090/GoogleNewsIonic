import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.page.html',
  styleUrls: ['./noticia.page.scss'],
})
export class NoticiaPage implements OnInit {
  noticia = null;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
      this.noticia = this.route.snapshot.paramMap.get('e');
      console.log(this.noticia);
    
  }

}
