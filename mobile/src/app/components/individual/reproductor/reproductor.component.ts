import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { Location } from '@angular/common'; // ✅ ESTA es la correcta
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonAvatar,
  IonButton,
  IonIcon,
  IonList,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonButtons,
  IonListHeader,
  IonFooter,
  IonTabButton,
  IonTabBar,
  IonTabs,
  IonBackButton   // Añadido para <ion-tab-bar>
} from '@ionic/angular/standalone';
import { Browser } from '@capacitor/browser';
import {
  playCircleOutline,
  pauseCircleOutline,
    ellipsisVerticalOutline,
  playSkipBackOutline,
  playSkipForwardOutline,
  heart,
  heartOutline,
  chevronDownOutline,
  arrowBackOutline
} from 'ionicons/icons';





@Component({
  selector: 'app-reproductor',
  templateUrl: './reproductor.component.html',
  styleUrls: ['./reproductor.component.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonAvatar,
    IonButton,
    IonIcon,
    IonCardHeader,
  IonCardTitle,
  IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonButtons,
    IonListHeader,
    IonFooter,
    IonTabButton, // Añadido al arreglo imports
    FooterComponent,
    IonTabBar,
    IonTabs,
    IonBackButton
  ],
})



export class ReproductorComponent implements OnInit {

podcasts = [
  {
    titulo: 'Inteligencia Artificial Hoy',
    episodio: 12,
    duracion: '24:15',
    imagenUrl: 'https://forbes.es/wp-content/uploads/2024/12/C02541AB-DBAB-4DD9-9355-1FD3B4F76CC1.jpg',
    audioUrl: 'assets/podcasts/ia-12.mp3'
  },
  {
    titulo: 'Salud Mental en la Era Digital',
    episodio: 7,
    duracion: '18:40',
    imagenUrl: 'https://okdiario.com/img/2019/07/24/cantantes-famosos-regueton.jpeg',
    audioUrl: 'assets/podcasts/salud-7.mp3'
  }
];




  activeTab: string = 'reproductor'; // Pestaña activa para el footer

  constructor(private router: Router ,  private location: Location,) {
 addIcons({
    'play-circle-outline': playCircleOutline,
    'pause-circle-outline': pauseCircleOutline,
    'play-skip-back-outline': playSkipBackOutline,
      'ellipsis-vertical-outline': ellipsisVerticalOutline,
    'play-skip-forward-outline': playSkipForwardOutline,
        'arrow-back-outline': arrowBackOutline,
           'chevron-down-outline': chevronDownOutline,
    'heart': heart,
    'heart-outline': heartOutline
  });

  }


  ngOnInit() {}
podcastActivo: any = null;
enReproduccion: boolean = true;
tiempoActual: string = '00:00';

reproducir(podcast: any) {
  this.podcastActivo = podcast;
  this.enReproduccion = true;
  this.tiempoActual = '00:00'; // Simulado
}

togglePlay() {
  this.enReproduccion = !this.enReproduccion;
}

anterior() {
  console.log('Volver 15 seg');
}

siguiente() {
  console.log('Avanzar 15 seg');
}

toggleFavorito(podcast: any) {
  podcast.favorito = !podcast.favorito;
}
opciones(podcast: any) {
  console.log('Opciones para:', podcast);
  // Aquí podrías abrir un ActionSheet o menú contextual
}
cerrarReproductor() {
  this.podcastActivo = null;
}

  goBack() {
        this.location.back();
      }

  onFooterTabChanged(tabName: string) {
    console.log('Footer seleccionó pestaña:', tabName);
    this.activeTab = tabName;
  }
async openExternal(url: string) {
  await Browser.open({ url });
}
}
