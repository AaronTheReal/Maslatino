// Componente: podcast.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PodcastPCService, PodcastDesktopPayload } from '../../../services/podcast-servicePC';

@Component({
  selector: 'app-podcast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './podcast.html',
  styleUrls: ['./podcast.css']
})
export class Podcast implements OnInit {
  podcasts: PodcastDesktopPayload[] = [];
  errorMessage: string | null = null;

  constructor(private podcastServicePC: PodcastPCService) {}

ngOnInit(): void {
  this.podcastServicePC.obtenerPodcastsHome().subscribe({
    next: (data) => {
      this.podcasts = data;
      console.log('✅ Podcasts recibidos:', this.podcasts); // <-- AQUÍ
    },
    error: (err) => {
      console.error(err);
      this.errorMessage = 'No se pudieron cargar los podcasts destacados';
    }
  });
}

}