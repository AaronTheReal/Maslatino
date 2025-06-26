import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../../services/noticias-service';
import { CommonModule } from '@angular/common';
import { Noticia } from '../../../models/noticia.model'; // ajusta la ruta si es necesario

@Component({
  selector: 'app-noticia-individual',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './noticia-individual.html',
  styleUrls: ['./noticia-individual.css']
})
export class NoticiaIndividual implements OnInit {
  noticias: Noticia[] = []; // ✅ Ya tiene tipo

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.noticiasService.getNoticias().subscribe({
      next: (data) => {
        this.noticias = data;
        console.log('Noticias recibidas:', this.noticias);
      },
      error: (err) => {
        console.error('Error al obtener noticias:', err);
      }
    });
  }
}
