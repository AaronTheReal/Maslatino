import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { radioOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; // ✅ ESTA es la correcta
import { TranslateModule, TranslateService } from '@ngx-translate/core'; // 👈 añadido
import { AudioPlayerService } from '../../../services/player-service';
import { FooterComponent } from '../../../components/shared/footer/footer.component';

@Component({
  selector: 'app-radio-vida',
  templateUrl: './radio-vida.component.html',
  styleUrls: ['./radio-vida.component.scss'],
  imports: [CommonModule, IonicModule, TranslateModule,FooterComponent],
    standalone: true,

})
export class RadioVidaComponent  {
  activeTab: string = 'radio-vida';


  constructor(
      private audioService: AudioPlayerService,
      private router: Router,
      private location: Location
  ) { }

      goBack() {
        this.location.back();
      }
        playRadio() {
    this.audioService.play({
      type: 'Radio',
      url: 'https://stream.radio.co/sebe037fbb/listen',
      title: 'Radio Vida',
      artwork: 'https://maslatino.com/wp-content/uploads/radiovida.png',
      isLive: true
    });
  }
    onFooterTabChanged(tabName: string) {
    console.log('Footer seleccionó pestaña:', tabName);
    this.activeTab = tabName;
  }
}
