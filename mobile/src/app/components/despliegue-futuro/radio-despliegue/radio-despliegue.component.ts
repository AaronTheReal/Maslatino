// src/app/components/individual/radio-despliegue/radio-despliegue.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PodcastService } from '../../../services/spotify-podcasts';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SafePipe } from '../../../pipes/safe.pipe'; // Asegúrate de tenerlo registrado
import { addIcons } from 'ionicons';
import { heart, heartOutline, arrowBackOutline, shareOutline } from 'ionicons/icons';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private podcastService: PodcastService
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

    this.podcastService.getShowById(id).subscribe({
      next: (data) => {
        this.show = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al obtener el show:', err);
        this.isLoading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/radio']);
  }
  toggleLike() {
  this.isLiked = !this.isLiked;
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
