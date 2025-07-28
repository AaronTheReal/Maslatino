
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PodcastService } from '../../../services/spotify-podcasts';
import { FormsModule } from '@angular/forms';
import { SafePipe } from '../../../pipes/safe.pipe';
import { UsuariosService } from '../../../services/usuarios-service';
import { AuthService } from '../../../services/auth-service';
import { addIcons } from 'ionicons';
import { arrowBackOutline, heart, heartOutline, shareOutline, playCircleOutline, pauseCircleOutline, ellipsisVerticalOutline, playSkipBackOutline, playSkipForwardOutline, chevronDownOutline } from 'ionicons/icons';
import { Location } from '@angular/common';
import { FooterComponent } from '../../shared/footer/footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core'; // 👈 añadido

interface Episodio {
  _id: string;
  titulo: string;
  episodio: number;
  duracion: string;
  imagenUrl: string;
  audioUrl: string;
  favorito: boolean;
  [key: string]: any; // Para permitir otros campos como description, releaseDate, etc.
}

@Component({
  selector: 'app-podcast-despliegue',
  templateUrl: './podcast-despliegue.component.html',
  styleUrls: ['./podcast-despliegue.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, SafePipe, FooterComponent , TranslateModule],
})
export class PodcastDespliegueComponent implements OnInit {
  @ViewChild('audio', { static: false }) audioRef!: ElementRef<HTMLAudioElement>;
  podcast: any;
  isFavorite = false;
  user: any;
  isFlipped = false;
  podcastActivo: any = null;
  podcastPortada: any = null;
  enReproduccion: boolean = false; // Cambiado a false por defecto
  tiempoActual: string = '00:00';
  favoriteNewsIds = new Set<string>();
  favoritePodcastIds = new Set<string>();
  favoriteEpisodeIds = new Set<string>();
  podcasts: Episodio[] = [];


  constructor(
    private route: ActivatedRoute,
    private podcastService: PodcastService,
    private usuarioService: UsuariosService,
    private authService: AuthService,
    private location: Location
  ) {
    addIcons({
      heart,
      'heart-outline': heartOutline,
      'arrow-back-outline': arrowBackOutline,
      'share-outline': shareOutline,
      'play-circle-outline': playCircleOutline,
      'pause-circle-outline': pauseCircleOutline,
      'ellipsis-vertical-outline': ellipsisVerticalOutline,
      'play-skip-back-outline': playSkipBackOutline,
      'play-skip-forward-outline': playSkipForwardOutline,
      'chevron-down-outline': chevronDownOutline,
    });
  }

  ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');
  if (!id) return;

  this.authService.getUser().then((user) => {
    this.user = user;

    this.usuarioService.getFavorites(this.user._id).subscribe({
      next: (fav) => {
        console.log('Favoritos:', fav);

        // Convertimos a Set para acceso rápido
        const episodiosFav = new Set<string>(fav.episodios?.map((e: any) => e._id) ?? []);

        this.podcastService.getPodcastById(id).subscribe({
          next: (data) => {
            this.podcast = data;

            this.podcasts = data.episodes.map((ep: any, index: number) => ({
              titulo: ep.title,
              episodio: index + 1,
              duracion: this.formatDuration(ep.duration),
              imagenUrl: ep.image || data.coverImage,
              audioUrl: ep.audioUrl,
              favorito: episodiosFav.has(ep._id),
              ...ep,
            }));
          },
          error: (err) => {
            console.error('Error al cargar el podcast:', err);
          },
        });
      },
      error: (err) => console.error('Error al traer favoritos:', err),
    });
  });
}


  formatDuration(seconds: number): string {
    if (!seconds) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
toggleFavorite() {
  const episodio = this.podcastActivo;
  if (!episodio || !this.user?._id) return;

  const userId = this.user._id;
  const tipo = 'Episodio';
  const contentId = episodio._id;

  const accion = episodio.favorito
    ? this.usuarioService.removeFavorite(contentId, tipo, userId)
    : this.usuarioService.addFavoriteToUse(contentId, tipo, userId);

  accion.subscribe({
    next: () => {
      // Cambiar en el objeto actual
      episodio.favorito = !episodio.favorito;

      // También actualizar en la lista por si ya está renderizada
      const index = this.podcasts.findIndex(p => p._id === episodio._id);
      if (index !== -1) {
        this.podcasts[index].favorito = episodio.favorito;
      }
    },
    error: (err) => {
      console.error('Error al cambiar favorito:', err);
    }
  });
}


  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }

  share() {
    if (navigator.share) {
      navigator
        .share({
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

  goBack() {
    this.location.back();
  }

  // Métodos del reproductor
  reproducir(podcast: any) {
    console.log("Play al entrar");
    if (!this.audioRef?.nativeElement) {
      console.error('El elemento <audio> no está disponible.');
      return;
    }

    this.podcastActivo = podcast;
    this.enReproduccion = true;
    this.tiempoActual = '00:00';
    console.log("episodios", this.podcastActivo._id);

    const audio = this.audioRef.nativeElement;

    // Verificar si la URL es válida antes de asignarla
    if (!podcast.audioUrl) {
      console.error('audioUrl no está definido para el podcast:', podcast);
      return;
    }

    audio.src = podcast.audioUrl;

    // Manejar errores de carga

    audio.load();
    audio.play().then(() => {
      this.guardarUltimoReproducido(podcast); // 👈 Se guarda al iniciar reproducción
    }).catch((error) => {
      console.error('Error al reproducir el audio:', error);
      this.enReproduccion = false;
    });

    // Depuración adicional
    audio.addEventListener('error', (e) => {
      console.error('Error en el elemento <audio>:', e);
      console.log('Network State:', audio.networkState);
      console.log('Ready State:', audio.readyState);
    }, { once: true });
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
        this.guardarUltimoReproducido(this.podcastActivo); // 👈 Guarda incluso si se reanuda
      }).catch((error) => {
        console.error('Error al reanudar el audio:', error);
      });
    }

    this.enReproduccion = !this.enReproduccion;
  }

  guardarUltimoReproducido(podcast: any) {
    if (!this.user || !this.user._id || !this.podcast?._id || !podcast?._id) return;

  this.usuarioService.setLastPlayed(
      this.user._id, // 👈 ahora sí lo pasas
      this.podcast._id,
      podcast._id,
      this.audioRef?.nativeElement?.currentTime || 0,
      !this.enReproduccion
    ).subscribe({
      error: (err) => console.error('Error al guardar último episodio reproducido:', err)
    });
  }

  actualizarTiempo() {
    if (!this.audioRef?.nativeElement) return;
    const audio = this.audioRef.nativeElement;
    const current = Math.floor(audio.currentTime);
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
    audio.currentTime = Math.max(0, audio.currentTime - 15); // Retrocede 15 segundos
  }

  siguiente() {
    if (!this.audioRef?.nativeElement) return;
    const audio = this.audioRef.nativeElement;
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 15); // Avanza 15 segundos
  }

  toggleFavorito(podcast: any) {
    podcast.favorito = !podcast.favorito;
  }

  opciones(podcast: any) {
    console.log('Opciones para:', podcast);
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
}







/*

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PodcastService } from '../../../services/spotify-podcasts';
import { FormsModule } from '@angular/forms';
import { SafePipe } from '../../../pipes/safe.pipe';
import { UsuariosService } from '../../../services/usuarios-service';
import { AuthService } from '../../../services/auth-service';
import { addIcons } from 'ionicons';
import { arrowBackOutline, searchOutline, alertCircleOutline, heart, heartOutline, shareOutline, playCircleOutline, pauseCircleOutline, ellipsisVerticalOutline, playSkipBackOutline, playSkipForwardOutline, chevronDownOutline } from 'ionicons/icons';
import { Location } from '@angular/common';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-podcast-despliegue',
  templateUrl: './podcast-despliegue.component.html',
  styleUrls: ['./podcast-despliegue.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, SafePipe, FooterComponent],
})
export class PodcastDespliegueComponent implements OnInit {
  @ViewChild('audio', { static: false }) audioRef!: ElementRef<HTMLAudioElement>;
  podcast: any;
  isFavorite = false;
  user: any;
  isFlipped = false;
  podcastActivo: any = null;
  enReproduccion: boolean = true;
  tiempoActual: string = '00:00';
  podcasts = [
    {
      titulo: 'Inteligencia Artificial Hoy',
      episodio: 12,
      duracion: '24:15',
      imagenUrl: 'https://forbes.es/wp-content/uploads/2024/12/C02541AB-DBAB-4DD9-9355-1FD3B4F76CC1.jpg',
      audioUrl: 'assets/podcasts/ia-12.mp3'
    },
    {
      titulo: 'Salud Mental en la Era Digital',
      episodio: 7,
      duracion: '18:40',
      imagenUrl: 'https://okdiario.com/img/2019/07/24/cantantes-famosos-regueton.jpeg',
      audioUrl: 'assets/podcasts/salud-7.mp3'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private podcastService: PodcastService,
    private usuarioServce: UsuariosService,
    private authService: AuthService,
    private location: Location
  ) {
    addIcons({
      heart,
      'heart-outline': heartOutline,
      'arrow-back-outline': arrowBackOutline,
      'share-outline': shareOutline,
      'play-circle-outline': playCircleOutline,
      'pause-circle-outline': pauseCircleOutline,
      'ellipsis-vertical-outline': ellipsisVerticalOutline,
      'play-skip-back-outline': playSkipBackOutline,
      'play-skip-forward-outline': playSkipForwardOutline,
      'chevron-down-outline': chevronDownOutline
    });
  }

ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');
  if (!id) return;

  this.podcastService.getPodcastById(id).subscribe((data) => {
    this.podcast = data;
    this.podcasts = data.episodes.map((ep: any, index: number) => ({
      titulo: ep.title,
      episodio: index + 1,
      duracion: this.formatDuration(ep.duration),
      imagenUrl: ep.image || this.podcast.coverImage,
      audioUrl: ep.audioUrl,
      favorito: false,
      ...ep
    }));
  });
}
formatDuration(seconds: number): string {
  if (!seconds) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

  toggleFavorite() {
    const podcastId = this.podcast?._id;
    const tipo = "Podcast";
    this.authService.getUser().then(user => {
    this.user = user;


    const idUsuario = this.user?._id;

    if (!podcastId || !idUsuario) return;


    const accion = this.isFavorite
      ? this.usuarioServce.removeFavorite(podcastId, tipo, idUsuario)
      : this.usuarioServce.addFavoriteToUse(podcastId, tipo, idUsuario);

    accion.subscribe({
      next: res => {
        this.isFavorite = !this.isFavorite;
        console.log("Favorito cambiado:", res);
      },
      error: err => {
        console.error("Error al cambiar favorito", err);
      }
    });
     })
  }

  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }

  share() {
    if (navigator.share) {
      navigator
        .share({
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

  goBack() {
    this.location.back();
  }

  // Métodos del reproductor
    reproducir(podcast: any) {
      this.podcastActivo = podcast;
      this.enReproduccion = true;
      this.tiempoActual = '00:00';

      setTimeout(() => {
        const audio = this.audioRef.nativeElement;
        audio.src = podcast.audioUrl;
        audio.load();
        audio.play();
      });
    }
 togglePlay() {
  const audio = this.audioRef.nativeElement;
  if (this.enReproduccion) {
    audio.pause();
  } else {
    audio.play();
  }
  this.enReproduccion = !this.enReproduccion;
}
actualizarTiempo() {
  const audio = this.audioRef.nativeElement;
  const current = Math.floor(audio.currentTime);
  this.tiempoActual = this.formatDuration(current);
}
onSeek(event: any) {
  const newTime = event.detail.value;
  this.audioRef.nativeElement.currentTime = newTime;
}


  anterior() {
    console.log('Volver 15 seg');
  }

  siguiente() {
    console.log('Avanzar 15 seg');
  }

  toggleFavorito(podcast: any) {
    podcast.favorito = !podcast.favorito;
  }

  opciones(podcast: any) {
    console.log('Opciones para:', podcast);
    // Aquí podrías abrir un ActionSheet o menú contextual
  }

  cerrarReproductor() {
    this.podcastActivo = null;
  }
}
*/
