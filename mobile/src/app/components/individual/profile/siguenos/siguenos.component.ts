import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../../../components/shared/footer/footer.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
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
  IonButtons,
  IonListHeader,
  IonFooter,
  IonTabButton,
  IonTabBar, 
  IonTabs,
  IonBackButton   // Añadido para <ion-tab-bar>
} from '@ionic/angular/standalone';
import { logoInstagram, logoTiktok, logoFacebook, logoYoutube, logoTwitter } from 'ionicons/icons';
@Component({
  selector: 'app-siguenos',
  templateUrl: './siguenos.component.html',
  styleUrls: ['./siguenos.component.scss'],
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
export class SiguenosComponent implements OnInit {
  activeTab: string = 'siguenos'; // Pestaña activa para el footer

  constructor(private router: Router) {
    addIcons({
  'logo-instagram': logoInstagram,
  'logo-tiktok': logoTiktok,
  'logo-facebook': logoFacebook,
  'logo-youtube': logoYoutube,
  'logo-twitter': logoTwitter,
});
  }

  ngOnInit() {}

  onFooterTabChanged(tabName: string) {
    console.log('Footer seleccionó pestaña:', tabName);
    this.activeTab = tabName;
  }
}
