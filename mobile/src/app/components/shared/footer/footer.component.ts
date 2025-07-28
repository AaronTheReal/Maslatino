import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonFooter,
  IonToolbar,
  IonButton
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AppGlobalPlayerComponent } from '../../../components/app-global-player/app-global-player.component';
import { AudioPlayerService } from '../../../services/player-service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, IonFooter, IonToolbar, IonButton, AppGlobalPlayerComponent],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  @Input() activeTab: string = 'home';
  @Output() tabChange = new EventEmitter<string>();

  tabs = [
    { name: 'home' },
    { name: 'announcements' },
    { name: 'play' },
    { name: 'calendar' },
    { name: 'profile' }
  ];

  showPlayer = false;

  constructor(
    private router: Router,
    private audio: AudioPlayerService
  ) {
    this.audio.state$.subscribe((state) => {
      this.showPlayer = !!state.source;
    });
  }

  onSelect(tabName: string) {
    this.activeTab = tabName;
    this.tabChange.emit(tabName);

    const ruta = {
      home: '/home',
      announcements: '/announcements',
      play: '/reproductor',
      calendar: '/calentario',
      profile: '/profile'
    }[tabName];

    if (ruta) {
      this.router.navigate([ruta]);
    }
  }
}
