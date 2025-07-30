import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { Location } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonAvatar, IonButton, IonIcon,
  IonList, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonButtons,
  IonListHeader, IonFooter, IonTabButton, IonTabBar, IonTabs, IonBackButton, IonRange
} from '@ionic/angular/standalone';
import { Browser } from '@capacitor/browser';
import {
  playCircleOutline, pauseCircleOutline, ellipsisVerticalOutline, playSkipBackOutline,
  playSkipForwardOutline, heart, heartOutline, chevronDownOutline, arrowBackOutline
} from 'ionicons/icons';
import { TranslateModule, TranslateService } from '@ngx-translate/core'; // 👈 añadido

import { UsuariosService } from '../../../services/usuarios-service';
import { PodcastService } from '../../../services/spotify-podcasts';
import { AuthService } from '../../../services/auth-service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-reproductor',
  templateUrl: './reproductor.component.html',
  styleUrls: ['./reproductor.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonAvatar, IonButton, IonIcon,
    IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonButtons,
    IonListHeader, IonFooter, IonTabButton, FooterComponent, IonTabBar, IonTabs, IonBackButton, IonRange     ,     TranslateModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // ✅ aquí lo agregas

})
export class ReproductorComponent implements OnInit {
  @ViewChild('audio', { static: false }) audioRef!: ElementRef<HTMLAudioElement>;

  user!: any;

  podcast: any = null;          // Podcast completo
  podcasts: any[] = [];         // Lista de episodios mapeados
  episodiosFav = new Set<string>(); // Si luego quieres marcar favoritos

  podcastActivo: any = null;    // Episodio activo
  enReproduccion = false;
  tiempoActual = '00:00';
  loading = true;

  // estado del backend para retomar posición/pausa
  lastPlayerState: { position: number; isPaused: boolean; playedAt: string } | null = null;

  activeTab: string = 'reproductor';

  constructor(
    private router: Router,
    private location: Location,
    private usuariosService: UsuariosService,
    private podcastService: PodcastService,
    private authService: AuthService
  ) {
    addIcons({
      'play-circle-outline': playCircleOutline,
      'pause-circle-outline': pauseCircleOutline,
      'play-skip-back-outline': playSkipBackOutline,
      'play-skip-forward-outline': playSkipForwardOutline,
      'ellipsis-vertical-outline': ellipsisVerticalOutline,
      'arrow-back-outline': arrowBackOutline,
      'chevron-down-outline': chevronDownOutline,
      'heart': heart,
      'heart-outline': heartOutline
    });
  }

  async ngOnInit() {
    // 1) Obtener usuario
    this.user = await this.authService.getUser();
    if (!this.user?._id) return;

    // 2) Obtener lastPlayedEpisode
    this.usuariosService.getLastPlayed(this.user._id).subscribe({
      next: async (resp) => {
        // resp trae: { podcast, episode, playerState }
        const { podcast, episode, playerState } = resp;
        this.lastPlayerState = playerState;

        // 3) Traer el podcast completo para tener todos los episodios y mostrarlos debajo si quieres
        const podcastData = await this.podcastService.getPodcastById(podcast._id).toPromise();
        this.podcast = podcastData;

        // 4) Mapear episodios
        this.podcasts = podcastData.episodes.map((ep: any, index: number) => ({
          titulo: ep.title,
          episodio: index + 1,
          duracion: this.formatDuration(ep.duration),
          imagenUrl: ep.image || podcastData.coverImage,
          audioUrl: ep.audioUrl,
          favorito: this.episodiosFav.has(ep._id),
          ...ep
        }));

        // 5) Activar el episodio correcto (con reproducción pausada o no según playerState)
        const encontrado = this.podcasts.find(p => p._id === episode._id);
        if (encontrado) {
          // Seteamos el player expandido con ese episodio
          this.reproducir(encontrado, true /*desdeRestore*/);
          // Restaurar estado
          if (this.lastPlayerState) {
            // posicionar el audio
            const audio = this.audioRef?.nativeElement;
            if (audio && this.lastPlayerState.position > 0) {
              audio.currentTime = this.lastPlayerState.position;
              this.tiempoActual = this.formatDuration(Math.floor(audio.currentTime));
            }
            // Pausar si estaba pausado
            if (this.lastPlayerState.isPaused) {
              this.enReproduccion = true; // para que togglePlay haga pause inmediato
              this.togglePlay();          // pausa
            }
          }
        }
      },
      error: (err) => {
        if (err.status === 204) {
          this.loading = false;

          // No hay último reproducido: no mostramos el player
          return;
        }
        this.loading = false;
        console.error('Error al traer el lastPlayedEpisode:', err);
      }
    });
    this.loading = false;

  }

  // ==== Player ====

  reproducir(podcast: any, desdeRestore = false) {
    if (!this.audioRef?.nativeElement) {
      console.error('El elemento <audio> no está disponible.');
      return;
    }

    this.podcastActivo = podcast;
    this.tiempoActual = '00:00';

    const audio = this.audioRef.nativeElement;
    if (!podcast.audioUrl) {
      console.error('audioUrl no está definido:', podcast);
      return;
    }

    audio.src = podcast.audioUrl;
    audio.load();

    // Si venimos de restaurar estado podemos no auto-reproducir si estaba pausado
    if (desdeRestore && this.lastPlayerState?.isPaused) {
      this.enReproduccion = false;
      return;
    }

    audio.play().then(() => {
      this.enReproduccion = true;
      // Guardar inmediatamente como último reproduciendo
      this.guardarUltimoReproducido(podcast);
    }).catch((err) => {
      console.error('Error al reproducir:', err);
      this.enReproduccion = false;
    });

    audio.addEventListener('error', (e) => {
      console.error('Error en el elemento <audio>:', e);
      console.log('Network State:', audio.networkState);
      console.log('Ready State:', audio.readyState);
    }, { once: true });
  }
  share() {
  const url = this.podcast.url || `https://open.spotify.com/show/${this.podcast.spotifyId}`;
  if (navigator.share) {
    navigator
      .share({
        title: this.podcast.title,
        text: 'Escucha este podcast en Más Latino',
        url: url,
      })
      .then(() => console.log('Compartido exitosamente'))
      .catch((error) => console.error('Error al compartir', error));
  } else {
    // Copiar al portapapeles como alternativa
    navigator.clipboard.writeText(url)
      .then(() => alert('Enlace copiado al portapapeles'))
      .catch(() => alert('No se pudo copiar el enlace'));
  }
}
  togglePlay() {
    if (!this.audioRef?.nativeElement) {
      console.error('El elemento <audio> no está disponible.');
      return;
    }

    const audio = this.audioRef.nativeElement;
    if (this.enReproduccion) {
      audio.pause();
    } else {
      audio.play().then(() => {
        this.guardarUltimoReproducido(this.podcastActivo);
      }).catch((error) => {
        console.error('Error al reanudar el audio:', error);
      });
    }
    this.enReproduccion = !this.enReproduccion;
  }

  guardarUltimoReproducido(podcast: any) {
    if (!this.user?._id || !this.podcast?._id || !podcast?._id) return;

    const position = this.audioRef?.nativeElement?.currentTime || 0;

    this.usuariosService.setLastPlayed(
      this.user._id,
      this.podcast._id,
      podcast._id,
      Math.floor(position),
      !this.enReproduccion
    ).subscribe({
      error: (err) => console.error('Error al guardar último episodio reproducido:', err)
    });
  }

  actualizarTiempo() {
    if (!this.audioRef?.nativeElement) return;
    const current = Math.floor(this.audioRef.nativeElement.currentTime);
    this.tiempoActual = this.formatDuration(current);
  }

  onSeek(event: any) {
    if (!this.audioRef?.nativeElement) return;
    const newTime = event.detail.value;
    this.audioRef.nativeElement.currentTime = newTime;
  }

  anterior() {
    if (!this.audioRef?.nativeElement) return;
    const audio = this.audioRef.nativeElement;
    audio.currentTime = Math.max(0, audio.currentTime - 15);
  }

  siguiente() {
    if (!this.audioRef?.nativeElement) return;
    const audio = this.audioRef.nativeElement;
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 15);
  }

  cerrarReproductor() {
    if (this.audioRef?.nativeElement) {
      this.audioRef.nativeElement.pause();
    }
    this.podcastActivo = null;
    this.enReproduccion = false;
  }

  onAudioError(event: Event) {
    console.error('Error en el elemento <audio>:', event);
    const audio = this.audioRef.nativeElement;
    console.log('Network State:', audio.networkState);
    console.log('Ready State:', audio.readyState);
  }

  toggleFavorito(podcast: any) {
    podcast.favorito = !podcast.favorito;
  }

  opciones(podcast: any) {
    console.log('Opciones para:', podcast);
  }

  goBack() {
    this.location.back();
  }

  onFooterTabChanged(tabName: string) {
    this.activeTab = tabName;
  }

  async openExternal(url: string) {
    await Browser.open({ url });
  }

  // ==== utils ====
  formatDuration(seconds: number): string {
    if (!seconds) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
}
