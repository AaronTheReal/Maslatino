import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { PodcastService } from '../../../services/spotify-podcasts';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBackOutline, searchOutline, alertCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-podcasts-ind',
  standalone: true,
  imports: [IonicModule, CommonModule,FormsModule],
  templateUrl: './podcasts-ind.component.html',
  styleUrls: ['./podcasts-ind.component.scss'],
})
export class PodcastsIndComponent implements OnInit {
  searchTerm: string = '';
filteredPodcasts: typeof this.podcasts = [];
isLoading = true;


  podcasts: Array<{
    _id?: string;
    spotifyId: string;
    title: string;
    description?: string;
    image?: string;
    url?: string;
    embedUrl?: string;
    safeEmbedUrl?: SafeResourceUrl; // nuevo campo para iframe seguro
  }> = [];

  constructor(
    private podcastService: PodcastService,
    private sanitizer: DomSanitizer,
    private router: Router // <-- agrega esto

  ) {

    addIcons({
  'arrow-back-outline': arrowBackOutline,
  'search-outline': searchOutline,
  'alert-circle-outline': alertCircleOutline
});
  }

ngOnInit(): void {
  this.isLoading = true;

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
}

filterPodcasts() {
  const term = this.normalize(this.searchTerm.trim().toLowerCase());
  if (!term) {
    this.filteredPodcasts = this.podcasts;
    return;
  }

  const words = term.split(/\s+/);
  this.filteredPodcasts = this.podcasts.filter(p => {
    const normalizedTitle = this.normalize(p.title.toLowerCase());
    return words.every(word => normalizedTitle.includes(word));
  });
}
normalize(text: string): string {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
goBack() {
  this.router.navigate(['/home']);
}

}
