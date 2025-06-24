// src/app/components/features/podcasts/podcasts.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-podcasts',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './podcasts.component.html',
  styleUrls: ['./podcasts.component.scss'],
})
export class PodcastsComponent {
  @Input() podcastsList: Array<{
    id?: any;
    title: string;
    img?: string;
    description?: string;
  }> = [];

  @Output() selectPodcast = new EventEmitter<any>();

  constructor(private router: Router) {}

  /** Emite evento al seleccionar una tarjeta */
  onSelect(item: any) {
    this.selectPodcast.emit(item);
  }

  /** Navega a la lista completa de podcasts */
  viewAll() {
    this.router.navigate(['/podcasts']);
  }
}
