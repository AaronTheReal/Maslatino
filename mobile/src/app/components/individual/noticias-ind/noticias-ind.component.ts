import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NoticiasService } from '../../../services/noticias-service';
import { Noticia } from '../../../models/noticia.model';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonButtons  
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-noticias-ind',
  templateUrl: './noticias-ind.component.html',
  styleUrls: ['./noticias-ind.component.scss'],
  standalone: true,
imports: [
  CommonModule,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonButtons
]

})
export class NoticiasIndComponent implements OnInit {
  articles: Noticia[] = [];
  paginatedArticles: Noticia[] = [];

  currentPage = 1;
  pageSize = 6;
  totalPages = 1;

  constructor(
    private noticiasService: NoticiasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.noticiasService.getNoticias().subscribe({
      next: (data: Noticia[]) => {
        this.articles = data;
        this.totalPages = Math.ceil(this.articles.length / this.pageSize);
        this.updatePaginatedArticles();
      },
      error: (err) => console.error('Error al cargar noticias', err)
    });
  }

  updatePaginatedArticles(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    this.paginatedArticles = this.articles.slice(start, start + this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedArticles();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedArticles();
    }
  }

  onCardClick(id?: string): void {
    if (id) {
      this.router.navigate(['/noticia-despliegue', id]);
    }
  }

  getBackground(image?: string): string {
    return image ? `url(${image})` : 'none';
  }
  goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    this.router.navigate(['/home']);
  }
}
}
