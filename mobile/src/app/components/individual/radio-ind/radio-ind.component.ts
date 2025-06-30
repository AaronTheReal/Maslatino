import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { PodcastService } from '../../../services/spotify-podcasts';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBackOutline, searchOutline, alertCircleOutline } from 'ionicons/icons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-radio-ind',
  templateUrl: './radio-ind.component.html',
  styleUrls: ['./radio-ind.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class RadioIndComponent implements OnInit {
  shows: any[] = [];
  filteredShows: any[] = [];
  searchTerm: string = '';
  isLoading = true;

  constructor(
    private podcastService: PodcastService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    addIcons({
      'arrow-back-outline': arrowBackOutline,
      'search-outline': searchOutline,
      'alert-circle-outline': alertCircleOutline
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
  console.log('ID recibido:', id);
  // Usar este id para cargar detalles del show

    this.podcastService.getShows().subscribe({
      next: (data) => {
            console.log("🔍 Respuesta cruda del backend:", data);

        this.shows = Array.isArray(data) ? data : [];
        this.filteredShows = this.shows.slice();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching shows:', err);
        this.shows = [];
        this.filteredShows = [];
        this.isLoading = false;
      }
    });
  }

  filterShows() {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredShows = this.shows.slice();
      return;
    }
    this.filteredShows = this.shows.filter(show =>
      show.title.toLowerCase().includes(term)
    );
  }

  normalize(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

goToShowDetail(showId: string) {
  this.router.navigate(['/radio-despliegue', showId]); // <- CAMBIADO
}


  goBack() {
    this.router.navigate(['/home']);
  }
}
