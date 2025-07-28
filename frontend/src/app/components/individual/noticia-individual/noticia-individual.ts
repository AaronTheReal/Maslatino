import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../../services/noticias-service';
import { CommonModule } from '@angular/common';
import { Noticia } from '../../../models/noticia.model';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CategoriaService, CategoriaPayload } from '../../../services/categorias-service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-noticia-individual',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './noticia-individual.html',
  styleUrls: ['./noticia-individual.css']
})
export class NoticiaIndividual implements OnInit {
  noticia?: Noticia; // solo una noticia
  busqueda: string = '';
  categorias: CategoriaPayload[] = [];
  recientes: Noticia[] = [];
  archivos: { anio: number; mes: string; nombre: string }[] = [];

constructor(
  private noticiasService: NoticiasService,
  private route: ActivatedRoute,
  private titleService: Title,
  private metaService: Meta,
  private categoriasService: CategoriaService
) {}

ngOnInit(): void {
  this.obtenerCategorias();
  this.obtenerNoticiasRecientes();
  this.generarMesesDesde2025(); // ⬅️ nuevo método
console.log("recientes",this.recientes);
  const slug = this.route.snapshot.paramMap.get('slug');
  if (slug) {
    this.noticiasService.getNoticias().subscribe({
      next: (data) => {
        this.noticia = data.find((n: Noticia) => n.slug === slug);

        if (this.noticia) {
          const title = this.noticia.title;
          const description = this.noticia.meta?.description || this.noticia.summary || 'Noticias Más Latino';
          const image = this.noticia.meta?.image;

          // 🏷️ <title>
          this.titleService.setTitle(title);

          // 📝 <meta name="description">
          this.metaService.updateTag({ name: 'description', content: description });

          // 📘 Open Graph (Facebook)
          this.metaService.updateTag({ property: 'og:title', content: title });
          this.metaService.updateTag({ property: 'og:description', content: description });
          if (image) {
            this.metaService.updateTag({ property: 'og:image', content: image });
          }

          // 🐦 Twitter
          this.metaService.updateTag({ name: 'twitter:title', content: title });
          this.metaService.updateTag({ name: 'twitter:description', content: description });
          if (image) {
            this.metaService.updateTag({ name: 'twitter:image', content: image });
          }
        }
      },
      error: (err) => {
        console.error('Error al obtener noticias:', err);
      }
    });
  }
}


buscarNoticia() {
  console.log('Buscando:', this.busqueda);
  // Aquí puedes redirigir, filtrar, o lanzar una petición
}

  obtenerCategorias() {
    this.categoriasService.obtenerCategorias().subscribe({
      next: (res) => this.categorias = res,
      error: () => alert('Error al cargar categorías')
    });
  }
 obtenerNoticiasRecientes() {
  this.noticiasService.getNoticiasRecientes(5).subscribe({
    next: (res) => this.recientes = res,
    error: () => console.error('Error al cargar noticias recientes')
  });
}
generarMesesDesde2025() {
  const mesesNombres = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];

  const ahora = new Date();
  const anioActual = ahora.getFullYear();
  const mesActual = ahora.getMonth(); // 0 = enero

  for (let anio = 2025; anio <= anioActual; anio++) {
    const hastaMes = anio === anioActual ? mesActual : 11;
    for (let mes = 0; mes <= hastaMes; mes++) {
      this.archivos.push({
        anio,
        mes: (mes + 1).toString().padStart(2, '0'), // '01', '02', etc.
        nombre: `${mesesNombres[mes]} ${anio}`
      });
    }
  }
    this.archivos.reverse();

}


}
