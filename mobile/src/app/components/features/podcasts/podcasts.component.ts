import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {PodcastService} from '../../../services/spotify-podcasts'
import { TranslateModule, TranslateService } from '@ngx-translate/core'; // 👈 añadido

@Component({
  selector: 'app-podcasts',
  standalone: true,
  imports: [IonicModule, CommonModule,TranslateModule],
  templateUrl: './podcasts.component.html',
  styleUrls: ['./podcasts.component.scss'],
})
export class PodcastsComponent implements OnInit {
  @Input() podcastsList: Array<{
    _id?: string;
    spotifyId: string;
    title: string;
    description?: string;
    image?: string;
    url?: string;
    embedUrl?: string;
  }> = [];

  @Output() selectPodcast = new EventEmitter<any>();

  constructor(private router: Router, private podcastService :PodcastService, public translate: TranslateService ) {}

  ngOnInit(): void {
    this.podcastService.getPodcasts().subscribe({
      next: (data) => {
        this.podcastsList = data;
        console.log(data)
      },
      error: (err) => console.error('Error al cargar noticias', err)
    });;
    // No need to fetch data here since it’s passed via @Input
  }
  onSelect(podcast: any) {
    console.log("seleccionado")
    this.router.navigate(['/podcast-despliegue', podcast._id]);
  }

  viewAll() {
    this.router.navigate(['/podcasts']);
  }
}