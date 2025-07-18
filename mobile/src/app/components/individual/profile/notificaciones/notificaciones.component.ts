import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../../shared/footer/footer.component';
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
import { mailOutline, personCircleOutline, walletOutline, arrowBackOutline } from 'ionicons/icons';





@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss'],
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



export class NotificacionesComponent implements OnInit {

 notificaciones = [
  {
    titulo: 'Nuevo mensaje',
    mensaje: 'Tienes un nuevo mensaje de soporte.',
    fecha: '04 Jul 2025',
    icon: mailOutline
  },
  {
    titulo: 'Actualización de perfil',
    mensaje: 'Tu perfil ha sido actualizado correctamente.',
    fecha: '03 Jul 2025',
    icon: personCircleOutline
  },
  {
    titulo: 'Recordatorio de pago',
    mensaje: 'Tu suscripción vence en 3 días.',
    fecha: '02 Jul 2025',
    icon: walletOutline
  }
];

  activeTab: string = 'notificaciones'; // Pestaña activa para el footer

  constructor(private router: Router ,  private location: Location,) {

 addIcons({
  'arrow-back-outline': arrowBackOutline,

});

  }

  ngOnInit() {}

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
