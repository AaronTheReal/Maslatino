import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NoticiasService } from '../../../services/noticias-service';
import { Noticia } from '../../../models/noticia.model';
import { CategoriaService } from '../../../services/categorias-service';
import { Categoria } from '../../../models/Categoria.model';

@Component({
  standalone: true,
  selector: 'app-noticias',
  imports: [IonicModule, CommonModule, TranslateModule],
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {
  @Input() newsList: Array<{ img: string; title: string }> = [];

  noticiasFiltradas: Noticia[] = [];

  constructor(
    private router: Router,
    private noticiasService: NoticiasService,
    public translate: TranslateService,
    public categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
  this.categoriaService.obtenerCategorias().subscribe({
    next: (payloads) => {
      const categorias: Categoria[] = payloads.map(p => ({
        id: p._id ?? '', // Fallback si _id viene undefined
        name: p.name,
        color: p.color,
        image: p.image,
      }));

      const nombresCategorias = categorias.map(cat => cat.name);

      this.noticiasService.getNoticiasInicio(nombresCategorias).subscribe({
        next: (noticias) => {
          this.noticiasFiltradas = noticias;
          console.log("noticias", this.noticiasFiltradas);
        },
        error: (err) => {
          console.error('Error al obtener noticias:', err);
        }
      });
    },
    error: (err) => {
      console.error('Error al obtener categorías:', err);
    }
  });
}


  onSelect(item: Noticia): void {
    this.router.navigate(['/noticia-despliegue', item._id]);
  }

  viewAll(): void {
    this.router.navigate(['/noticias']);
  }
}
