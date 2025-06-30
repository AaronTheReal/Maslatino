import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core'; // 👈 añadido
import { NoticiasService } from '../../../services/noticias-service';
import { Noticia } from '../../../models/noticia.model';

@Component({
  standalone: true,
  selector: 'app-noticias',
  imports: [IonicModule, CommonModule, TranslateModule], // 👈 importado
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {
  @Input() newsList: Array<{ img: string; title: string }> = [];

  categoriasUsuarioSimuladas = ['Mundo'];
  noticiasFiltradas: Noticia[] = [];

  constructor(
    private router: Router,
    private noticiasService: NoticiasService,
    public translate: TranslateService // 👈 opcional si se quiere usar en TS
  ) {}

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

  viewAll(): void {
    this.router.navigate(['/noticias']);
  }
}
