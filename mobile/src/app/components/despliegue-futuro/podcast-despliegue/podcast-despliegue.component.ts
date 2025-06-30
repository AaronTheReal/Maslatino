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
import { arrowBackOutline, searchOutline, alertCircleOutline,heart, heartOutline, shareOutline } from 'ionicons/icons';
import { Location } from '@angular/common'; // ✅ ESTA es la correcta

@Component({
  selector: 'app-podcast-despliegue',
  templateUrl: './podcast-despliegue.component.html',
  styleUrls: ['./podcast-despliegue.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, SafePipe],
})
export class PodcastDespliegueComponent implements OnInit {
  podcast: any;
  isFavorite = false;
  user: any;
  isFlipped = false;

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
        'share-outline': shareOutline
      });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.podcastService.getPodcastById(id).subscribe((data) => {
      this.podcast = data;
      console.log('🎙️ Podcast:', this.podcast);

      // Obtener usuario y verificar si es favorito
      this.authService.getUser().then(user => {
        this.user = user;

        const podcastId = this.podcast?._id;
        const tipo = 'Podcast';
        const idUsuario = this.user._id;

        if (!podcastId) return;

        this.usuarioServce.isFavorite(podcastId, tipo, idUsuario).subscribe({
          next: res => {
            this.isFavorite = res.isFavorite;
            console.log("¿Es favorito?", this.isFavorite);
          },
          error: err => {
            console.error("Error al verificar favorito", err);
          }
        });

      }).catch(err => {
        console.error("Error al obtener usuario", err);
      });
    });
  }

  toggleFavorite() {
    const podcastId = this.podcast?._id;
    const tipo = "Podcast";
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
}
