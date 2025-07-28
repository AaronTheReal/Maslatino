import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../../../components/shared/footer/footer.component';
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
import { Browser } from '@capacitor/browser';

import { TranslateModule, TranslateService } from '@ngx-translate/core'; // 👈 añadido


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
    IonBackButton,
          TranslateModule,
  ],
})
export class SiguenosComponent implements OnInit {
  activeTab: string = 'siguenos'; // Pestaña activa para el footer

  constructor(private router: Router ,  private location: Location,) {
    addIcons({
  'logo-instagram': logoInstagram,
  'logo-tiktok': logoTiktok,
  'logo-facebook': logoFacebook,
  'logo-youtube': logoYoutube,
  'logo-twitter': logoTwitter,
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
