import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NoticiasService } from '../../../services/noticias-service';
import { Noticia } from '../../../models/noticia.model'; // ajusta si cambia tu estructura

@Component({
  standalone: true,
  selector: 'app-noticias',
  imports: [IonicModule, CommonModule],
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {
  @Input() newsList: Array<{ img: string; title: string }> = [];

  categoriasUsuarioSimuladas = ['Mundo']; // luego dinámicas
  noticiasFiltradas: Noticia[] = [];

  constructor(
    private router: Router,
    private noticiasService: NoticiasService
  ) {}

  // Este es el lugar correcto para inicializar la petición
  ngOnInit(): void {
    this.noticiasService
      .getNoticiasInicio(this.categoriasUsuarioSimuladas)
      .subscribe({
        next: (noticias) => {
          this.noticiasFiltradas = noticias;
        },
        error: (error) => {
          console.error('Error al obtener noticias:', error);
        },
      });
  }

  onSelect(item: Noticia): void {
    this.router.navigate(['/noticia-despliegue', item._id]);
  }

  // Navegar a ver todas las noticias
  viewAll(): void {
    this.router.navigate(['/noticias']);
  }


}
