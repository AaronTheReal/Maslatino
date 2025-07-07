import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common'; // ✅ ESTA es la correcta
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonAvatar,
  IonInput,
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
import { mailOutline, personCircleOutline, walletOutline } from 'ionicons/icons';
import { TranslateModule, TranslateService } from '@ngx-translate/core'; // 👈 añadido
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
}



@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
      TranslateModule,
      IonInput,
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
    IonTabButton,
    FooterComponent,
    IonTabBar,
    IonTabs,
    IonBackButton
  ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})


export class EditprofileComponent implements OnInit {

  user: UserProfile = {
    name: 'Jaun',
    email: 'ang@gmail.com',
    avatarUrl: ''

  };
  activeTab: string = 'editprofile';

  constructor(private router: Router ,  private location: Location,  public translate: TranslateService) {

  }


ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }


  }
   get initials(): string {
    if (!this.user.name) {
      return '';
    }
    const parts = this.user.name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    const first = parts[0].charAt(0).toUpperCase();
    const last = parts[parts.length - 1].charAt(0).toUpperCase();
    return `${first}${last}`;
  }

 saveProfile() {
    console.log('Guardando perfil:', this.user);
    localStorage.setItem('user', JSON.stringify(this.user));
    this.router.navigate(['/profile']);
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
