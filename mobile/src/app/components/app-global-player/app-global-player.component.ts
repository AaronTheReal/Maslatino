import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AudioPlayerService } from './../../services/player-service';
import { addIcons } from 'ionicons';
import { pause, play, close, arrowBackOutline } from 'ionicons/icons';

addIcons({
  pause,
  play,
  close,
  'arrow-back-outline': arrowBackOutline
});
@Component({
  selector: 'app-global-player',
  standalone: true,
  imports: [CommonModule, IonicModule],
  styles: [`
    .floating-player {
      position: relative;
      bottom: 10px; /* Ajusta según necesites espacio sobre el footer */
      left: 0;
      width: 100%;
      height: 52px;
      background: #ffffff;
      border-top: 1px solid #ddd;
      box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
      z-index: 9999;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 12px;
    }

    .player-title {
      font-size: 14px;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex: 1;
      margin: 0 8px;
    }

    .icon-button {
      min-width: 32px;
      padding: 0;
    }
  `],
  template: `
    <div class="floating-player" *ngIf="state?.source">
      <ion-button class="icon-button" fill="clear" size="small" (click)="close()">
        <ion-icon name="close"></ion-icon>
      </ion-button>
      <div class="player-title">
        {{ state.source?.title || 'Reproduciendo' }}
      </div>
      <ion-button class="icon-button" fill="clear" size="small" (click)="toggle()">
        <ion-icon [name]="state.isPlaying ? 'pause' : 'play'"></ion-icon>
      </ion-button>
    </div>
  `
})
export class AppGlobalPlayerComponent {
  state = this.audio.snapshot;
  @Input() insideFooter = false;
  constructor(public audio: AudioPlayerService) {
    this.audio.state$.subscribe(s => (this.state = s));
  }

  toggle() {
    this.audio.toggle();
  }

  close() {
    this.audio.pause();
    this.audio.clear();
  }
}