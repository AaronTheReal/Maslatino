// src/app/components/individual/radio-despliegue/radio-despliegue.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PodcastService } from '../../../services/spotify-podcasts';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SafePipe } from '../../../pipes/safe.pipe'; // Asegúrate de tenerlo registrado
import { addIcons } from 'ionicons';
import { heart, heartOutline, arrowBackOutline, shareOutline } from 'ionicons/icons';
import { UsuariosService } from '../../../services/usuarios-service';
import { AuthService } from '../../../services/auth-service';
import { Location } from '@angular/common'; 
@Component({
  selector: 'app-radio-despliegue',
  standalone: true,
  imports: [IonicModule, CommonModule, SafePipe],
  templateUrl: './radio-despliegue.component.html',
  styleUrls: ['./radio-despliegue.component.scss'],
})
export class RadioDespliegueComponent implements OnInit {
  show: any;
  isLoading = true;
isLiked = false;
user: any;

constructor(
  private route: ActivatedRoute,
  private router: Router,
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
ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  if (!id) return;

  this.podcastService.getShowById(id).subscribe({
    next: (data) => {
      this.show = data;
      this.isLoading = false;

      // Obtener usuario y verificar favorito
      this.authService.getUser().then(user => {
        this.user = user;
        const tipo = "Radio";
        const idUsuario = user._id;
        const showId = this.show?._id;

        if (!showId) return;

        this.usuarioServce.isFavorite(showId, tipo, idUsuario).subscribe({
          next: res => {
            this.isLiked = res.isFavorite;
            console.log("¿Es favorito?", this.isLiked);
          },
          error: err => {
            console.error("Error al verificar favorito", err);
          }
        });
      }).catch(err => {
        console.error("Error al obtener usuario", err);
      });
    },
    error: (err) => {
      console.error('Error al obtener el show:', err);
      this.isLoading = false;
    }
  });
}

      goBack() {
        this.location.back();
      }
toggleLike() {

  const tipo = "Radio";
  const idUsuario = this.user?._id;
  const showId = this.show?._id;

  if (!showId || !idUsuario) return;

  const accion = this.isLiked
    ? this.usuarioServce.removeFavorite(showId, tipo, idUsuario)
    : this.usuarioServce.addFavoriteToUse(showId, tipo, idUsuario);

  accion.subscribe({
    next: res => {
      this.isLiked = !this.isLiked;
      console.log("Estado de favorito actualizado", res);
    },
    error: err => {
      console.error("Error al cambiar estado de favorito", err);
    }
  });
}


shareShow() {
  const url = 'https://open.spotify.com/show/' + this.show.spotifyId;
  if (navigator.share) {
    navigator.share({
      title: this.show.title,
      text: 'Escucha este show en Spotify',
      url
    }).catch(err => console.error('Error al compartir:', err));
  } else {
    navigator.clipboard.writeText(url);
    alert('Enlace copiado al portapapeles');
  }
}
}
