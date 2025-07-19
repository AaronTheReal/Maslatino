import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../../services/noticias-service';
import { CommonModule } from '@angular/common';
import { Noticia } from '../../../models/noticia.model';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.noticiasService.getNoticias().subscribe({
        next: (data) => {
      this.noticia = data.find((n: Noticia) => n.slug === slug);
        },
        error: (err) => {
          console.error('Error al obtener noticias:', err);
        }
      });
    }
  }
}
