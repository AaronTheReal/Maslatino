import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { PodcastService } from '../../../services/spotify-podcasts';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  searchOutline,
  alertCircleOutline
} from 'ionicons/icons';
import { CategoriaService, CategoriaPayload } from '../../../services/categorias-service';

@Component({
  selector: 'app-podcasts-ind',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './podcasts-ind.component.html',
  styleUrls: ['./podcasts-ind.component.scss'],
})
export class PodcastsIndComponent implements OnInit {
  searchTerm: string = '';
  isLoading = true;
  categoriaSeleccionada: string = '';

  podcasts: Array<{
    _id?: string;
    title: string;
    description?: string;
    coverImage?: string;
    embedUrl?: string;
    safeEmbedUrl?: SafeResourceUrl;
    categories?: string[]; // ObjectId
  }> = [];

  filteredPodcasts: typeof this.podcasts = [];

  categoriesDisponibles: Array<{
    _id: string;
    name: string;
  }> = [];

  constructor(
    private podcastService: PodcastService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private categoriaService: CategoriaService

  ) {
    addIcons({
      'arrow-back-outline': arrowBackOutline,
      'search-outline': searchOutline,
      'alert-circle-outline': alertCircleOutline
    });
  }

  ngOnInit(): void {
    this.isLoading = true;

    // 1. Obtener todos los podcasts
    this.podcastService.getPodcasts().subscribe({
      next: (data) => {
        this.podcasts = data.map((p: any) => ({
          ...p,
          safeEmbedUrl: this.sanitizer.bypassSecurityTrustResourceUrl(p.embedUrl || '')
        }));
        this.filteredPodcasts = this.podcasts;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar podcasts', err);
        this.isLoading = false;
      }
    });


    this.categoriaService.obtenerCategorias().subscribe({
      next: (data) => {
        this.categoriesDisponibles = data as { _id: string; name: string }[];
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
      }
    });

  }

  filterPodcasts() {
    const term = this.normalize(this.searchTerm.trim().toLowerCase());

    let base = this.podcasts;

    // Filtro por categoría si aplica
    if (this.categoriaSeleccionada) {
      base = base.filter(p => p.categories?.includes(this.categoriaSeleccionada));
    }

    // Filtro por texto si aplica
    if (!term) {
      this.filteredPodcasts = base;
      return;
    }

    const words = term.split(/\s+/);
    this.filteredPodcasts = base.filter(p => {
      const normalizedTitle = this.normalize(p.title.toLowerCase());
      return words.every(word => normalizedTitle.includes(word));
    });
  }
  onSelectPodcast(podcast: any) {
    this.router.navigate(['/podcast-despliegue', podcast._id]);
  }

  filtrarPorCategoria(categoriaId: string) {
    this.categoriaSeleccionada = categoriaId;
    this.filterPodcasts();
  }

  normalize(text: string): string {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
