import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-podcast',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './podcast.html',
  styleUrls: ['./podcast.css']
})
export class Podcast {
  podcasts = [
    { img: 'assets/Podcast/podcast1.jpg', alt: 'New England Deportes' },
    { img: 'assets/Podcast/podcast2.jpg', alt: 'Salud Vital' },
    { img: 'assets/Podcast/podcast3.jpg', alt: 'Las Mujeres Siempre Emprenden' },
    { img: 'assets/Podcast/podcast4.jpg', alt: 'Meeting Deportivo' }
  ];
}
