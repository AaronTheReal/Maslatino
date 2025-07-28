import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Location } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AudioPlayerService } from '../../../services/player-service';
import { addIcons } from 'ionicons';
import { arrowBackOutline, play, pause, close } from 'ionicons/icons';

addIcons({
  'arrow-back-outline': arrowBackOutline,
  play,
  pause,
  close
});

@Component({
  selector: 'app-radio-despliegue',
  standalone: true,
  imports: [CommonModule, IonicModule, TranslateModule],
  templateUrl: './radio-despliegue.component.html',
  styleUrls: ['./radio-despliegue.component.scss']
})
export class RadioDespliegueComponent implements OnInit {

  // Si quieres reutilizar, puedes inyectar por ruta estos datos
  station = {
    url: 'https://stream.radio.co/s9cb5ee0f7/listen',
    title: 'Radio Latino 99.9 FM Boston',
    artwork: 'https://maslatino.com/wp-content/uploads/maslatinoFM-03.png',
    isLive: true
  };

  constructor(
    private location: Location,
    private audio: AudioPlayerService
  ) {}

  ngOnInit(): void {
    // Si quieres que auto-reproduzca al entrar:
    // this.playRadio();
  }

  playRadio() {
    this.audio.play({
      type: 'Radio',
      url: this.station.url,
      title: this.station.title,
      artwork: this.station.artwork,
      isLive: this.station.isLive
    });
  }

  goBack() {
    this.location.back();
  }
}


/* import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-radio-despliegue',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './radio-despliegue.component.html',
  styleUrls: ['./radio-despliegue.component.scss']
})
export class RadioDespliegueComponent {}*/
