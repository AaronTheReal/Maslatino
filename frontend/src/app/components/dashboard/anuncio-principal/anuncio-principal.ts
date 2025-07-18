import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiasService, Noticia } from '../../../services/noticias-service'; // ajusta la ruta si es distinta

@Component({
  selector: 'app-anuncio-principal',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './anuncio-principal.html',
  styleUrls: ['./anuncio-principal.css']
})
export class AnuncioPrincipal implements OnInit{

  noticias: Noticia[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.noticiasService.getNoticias().subscribe((res) => {
      
      this.noticias = res.slice(0, 8); // ahora sí obtienes las 8 primeras
      console.log(this.noticias);
    });
  }
}
