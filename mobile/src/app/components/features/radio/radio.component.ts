// src/app/components/features/podcasts/podcasts.component.ts
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PodcastService } from '../../../services/spotify-podcasts';
import { TranslateModule, TranslateService } from '@ngx-translate/core'; // 👈 añadido


export interface RadioItem {
  _id?: string;
  spotifyId: string;
  title: string;
  description?: string;
  image?: string;
  url?: string;
  embedUrl?: string;
}

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule,TranslateModule],
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
})
export class RadioComponent implements OnInit {
  @Input() radioList: RadioItem[] = [];
  @Output() selectRadio = new EventEmitter<RadioItem>();

  constructor(private router: Router, private podcastService: PodcastService,public translate: TranslateService) {}

  ngOnInit(): void {
    this.podcastService.getPodcasts().subscribe({
      next: (data) => {
        this.radioList = data.slice(0, 10); // 👈 Mostrar solo 10
        console.log(this.radioList);
      },
      error: (err) => console.error('Error al cargar podcasts', err),
    });
  }

  onSelect(item: RadioItem) {
    this.selectRadio.emit(item);
  }

  viewAll() {
    this.router.navigate(['/radio']);
  }
}
