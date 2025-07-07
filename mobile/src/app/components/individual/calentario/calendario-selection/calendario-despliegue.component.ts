import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common'; // ✅ ESTA es la correcta
import { FooterComponent } from '../../../../components/shared/footer/footer.component';
import { CarruselComponent } from '../../../../components/features/carrusel/carrusel.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core'; // 👈 añadido
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
  IonItem,
  IonLabel,
  IonButtons,       // Añadido para <ion-buttons>
  IonListHeader,    // Añadido para <ion-list-header>
  IonFooter         // Añadido para <ion-footer>
} from '@ionic/angular/standalone';
import { calendarOutline, timeOutline, locationOutline, linkOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

import { IonicModule } from '@ionic/angular';
import { SafePipe } from '../../../../pipes/safe.pipe'; // Asegúrate de tenerlo registrado



@Component({
  selector: 'app-calendario-despliegue',
  templateUrl: './calendario-despliegue.component.html',
  styleUrls: ['./calendario-despliegue.component.scss'],
    imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
      CarruselComponent,
    IonAvatar,
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonButtons,       // Añadido
    IonListHeader,    // Añadido
    IonFooter,        // Añadido
    FooterComponent,
    TranslateModule,

  ],

})

export class CalentarioDespliegueComponent  implements OnInit {
  slidesArray = [
    { img: 'assets/img/carousel1.jpg', title: '' },
    { img: 'assets/img/carousel2.jpg', title: '' },
    { img: 'assets/img/carousel3.jpeg', title: '' },
  ]

 evento = {
  titulo: 'Conferencia de Tecnología 2025',
  fecha: new Date('2025-07-07'),
  horaInicio: '10:00 AM',
  horaFin: '12:00 PM',
  locacion: 'Centro de Convenciones, CDMX',
  url: 'https://miapp.com/eventos/tecnologia2025'
};


  constructor(
       private location: Location,


  ) {
addIcons({
  'calendar-outline': calendarOutline,
  'time-outline': timeOutline,
  'location-outline': locationOutline,
  'link-outline': linkOutline
});

  }

  ngOnInit() {}

    goBack() {
        this.location.back();
      }

}
