import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { radioOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; // ✅ ESTA es la correcta

import { TranslateModule, TranslateService } from '@ngx-translate/core'; // 👈 añadido


@Component({
  selector: 'app-radio-despliegue',
  standalone: true,
  imports: [CommonModule, IonicModule,          TranslateModule
  ],
  templateUrl: './radio-despliegue.component.html',
  styleUrls: ['./radio-despliegue.component.scss']
})



export class RadioDespliegueComponent implements AfterViewInit {

  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;
  constructor(
      private router: Router,
      private location: Location

    ) {
    addIcons({ 'radio-outline': radioOutline });

  }
  ngAfterViewInit() {
    const audio = this.audioPlayer.nativeElement;
    audio.volume = 0.5; // Volumen inicial al 50%
    audio.play(); // Iniciar automáticamente (si lo deseas)
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
