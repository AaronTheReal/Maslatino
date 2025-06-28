import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PodcastService } from '../../../services/spotify-podcasts';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { playBack, play, playForward, share, pause } from 'ionicons/icons';

declare global {
  interface Window {
    onSpotifyIframeApiReady: (IFrameAPI: any) => void;
    SpotifyIframeApi: any;
  }
}

@Component({
  selector: 'app-podcast-despliegue',
  templateUrl: './podcast-despliegue.component.html',
  styleUrls: ['./podcast-despliegue.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class PodcastDespliegueComponent implements AfterViewInit {
  @ViewChild('spotifyEmbed') spotifyEmbed!: ElementRef;
  podcast: any;
  EmbedController: any;
  isPlaying = false;
  currentTime = 0;
  duration = 0;

  constructor(private route: ActivatedRoute, private podcastService: PodcastService) {
    addIcons({
      'play-back': playBack,
      'play': play,
      'pause': pause,
      'play-forward': playForward,
      'share': share,
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.podcastService.getPodcastById(id).subscribe((data) => {
      this.podcast = data;
      this.duration = data.duration * 1000; // Convertir a milisegundos
      this.initSpotifyController();
    });
  }

  ngAfterViewInit() {
    // Llamar a initSpotifyController aquí también asegura que el DOM esté listo
    if (this.podcast) {
      this.initSpotifyController();
    }
  }

  initSpotifyController() {
    if (!this.spotifyEmbed || !this.podcast) return;

    const element = this.spotifyEmbed.nativeElement;
    const options = {
      uri: `spotify:show:${this.podcast.spotifyId}`, // Usar el ID del show
      width: '100%',
      height: '352', // Altura fija para un show completo (ajústalo según necesites)
      allow: 'autoplay; encrypted-media; fullscreen',
    };

    const callback = (controller: any) => {
      this.EmbedController = controller;
      controller.addListener('ready', () => {
        console.log('Reproductor de Spotify listo');
      });
      controller.addListener('playback_update', (e: any) => {
        this.currentTime = e.data.position;
        this.duration = e.data.duration;
        this.isPlaying = !e.data.isPaused;
      });
      controller.addListener('error', (error: any) => {
        console.error('Error en el reproductor de Spotify:', error);
      });
    };

    window.onSpotifyIframeApiReady = (IFrameAPI: any) => {
      console.log('API de Spotify iframe cargada');
      IFrameAPI.createController(element, options, callback);
    };

    if (!window.SpotifyIframeApi) {
      const script = document.createElement('script');
      script.src = 'https://open.spotify.com/embed/iframe-api/v1';
      script.async = true;
      script.onload = () => {
        console.log('Script de Spotify iframe cargado');
      };
      script.onerror = () => {
        console.error('Error al cargar el script de Spotify iframe');
      };
      document.body.appendChild(script);
    } else {
      // Si el script ya está cargado, llama directamente a la API
      window.onSpotifyIframeApiReady(window.SpotifyIframeApi);
    }
  }

  togglePlay() {
    if (this.EmbedController) {
      this.EmbedController.togglePlay();
    }
  }

  rewind() {
    const newTime = Math.max(0, this.currentTime - 15000); // Retroceder 15 segundos
    this.seek(newTime);
  }

  forward() {
    const newTime = Math.min(this.duration, this.currentTime + 15000); // Avanzar 15 segundos
    this.seek(newTime);
  }

  seek(value: number) {
    this.currentTime = value;
    if (this.EmbedController) {
      this.EmbedController.seek(this.currentTime);
    }
  }

  onSeek(event: any) {
    this.seek(event.detail.value);
  }

  share() {
    if (navigator.share) {
      navigator.share({
        title: this.podcast.title,
        text: 'Escucha este podcast',
        url: this.podcast.url || `https://open.spotify.com/show/${this.podcast.spotifyId}`,
      })
        .then(() => console.log('Compartido exitosamente'))
        .catch((error) => console.log('Error al compartir', error));
    } else {
      console.log('Web Share API no soportada');
    }
  }
}