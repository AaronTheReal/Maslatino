import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../../services/noticias-service';
import { CommonModule } from '@angular/common';
import { Noticia } from '../../../models/noticia.model';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-noticia-individual',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './noticia-individual.html',
  styleUrls: ['./noticia-individual.css']
})
export class NoticiaIndividual implements OnInit {
  noticia?: Noticia; // solo una noticia

constructor(
  private noticiasService: NoticiasService,
  private route: ActivatedRoute,
  private titleService: Title,
  private metaService: Meta
) {}

ngOnInit(): void {
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

}
