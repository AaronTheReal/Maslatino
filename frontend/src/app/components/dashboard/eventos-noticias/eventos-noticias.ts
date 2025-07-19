import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiasService, Noticia } from '../../../services/noticias-service'; // ajusta la ruta si es distinta
import { RouterModule } from '@angular/router'; // ✅ IMPORTA ESTO

@Component({
  selector: 'app-eventos-noticias',
  standalone: true,
  imports: [CommonModule,RouterModule ],
  templateUrl: './eventos-noticias.html',
  styleUrl: './eventos-noticias.css'
})
export class EventosNoticias implements OnInit {
  noticias: Noticia[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.noticiasService.getNoticias().subscribe((res) => {
      this.noticias = res.slice(0, 5); // Tomar solo las primeras 5
    });
  }
}
