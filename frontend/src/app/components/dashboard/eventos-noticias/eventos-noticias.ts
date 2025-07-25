import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { NoticiasService, Noticia } from '../../../services/noticias-service';
import { RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-eventos-noticias',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './eventos-noticias.html',
  styleUrl: './eventos-noticias.css'
})
export class EventosNoticias implements OnInit {
  noticias: Noticia[] = [];

  constructor(
    private noticiasService: NoticiasService,
    private title: Title,
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.noticiasService.getNoticias().subscribe((res) => {
      this.noticias = res.slice(0, 5);

      // Solo SEO para la primera noticia destacada
      if (this.noticias.length > 0 && isPlatformBrowser(this.platformId)) {
        const noticia = this.noticias[0];
        this.title.setTitle(`${noticia.title} - Más Latino`);
        this.meta.updateTag({ name: 'description', content: noticia.summary || 'Más Latino Noticias' });
        this.meta.updateTag({ property: 'og:title', content: noticia.title });
        this.meta.updateTag({ property: 'og:description', content: noticia.summary || '' });
        this.meta.updateTag({ property: 'og:image', content: noticia.meta?.image || '' });
        this.meta.updateTag({ property: 'og:url', content: `https://maslatino.netlify.app/noticia/${noticia.slug}` });
      }
    });
  }
}
