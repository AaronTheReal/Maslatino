import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PodcastService } from '../../../services/spotify-podcasts';
import { FormsModule } from '@angular/forms';
import { SafePipe } from '../../../pipes/safe.pipe';

@Component({
  selector: 'app-podcast-despliegue',
  templateUrl: './podcast-despliegue.component.html',
  styleUrls: ['./podcast-despliegue.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, SafePipe],
})
export class PodcastDespliegueComponent implements OnInit {
  podcast: any;

  constructor(
    private route: ActivatedRoute,
    private podcastService: PodcastService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.podcastService.getPodcastById(id).subscribe((data) => {
      this.podcast = data;
      console.log('🎙️ Podcast:', this.podcast);
    });
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
}
