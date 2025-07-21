import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { Location } from '@angular/common'; // ✅ ESTA es la correcta
import {
  createOutline,
  settingsOutline,
  gridOutline,
  heartOutline,
  notificationsOutline,
  peopleOutline,
  languageOutline,
  logOutOutline,
  constructOutline
} from 'ionicons/icons';
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

import { FooterComponent } from '../../../components/shared/footer/footer.component';
import { Preferences } from '@capacitor/preferences';
import { TranslateModule, TranslateService } from '@ngx-translate/core'; // 👈 añadido

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { AuthService } from '../../../services/auth-service';
import { UsuariosService } from '../../../services/usuarios-service';

import { AlertController } from '@ionic/angular';


interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
    IonButtons,       // Añadido
    IonListHeader,    // Añadido
    IonFooter,        // Añadido
    FooterComponent,
    TranslateModule,

  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: UserProfile = {
    name: 'Nombre Apellido',
    email: 'usuario@ejemplo.com',
    avatarUrl: '',
  };

  menuSections: Array<{
    header?: string;
    items: Array<{
      label: string;
      icon: string;
      action: () => void;
    }>;
  }> = [];
  isLoginPage = false;
  activeTab: string = 'profile';
  usuario: any;
  constructor(
    private router: Router,
    public translate: TranslateService,
       private location: Location,
    private alertCtrl: AlertController,
    private usuariosService: UsuariosService,
    private authService: AuthService ) {
    addIcons({
      'create-outline': createOutline,
      'settings-outline': settingsOutline,
      'grid-outline': gridOutline,
      'heart-outline': heartOutline,
      'notifications-outline': notificationsOutline,
      'people-outline': peopleOutline,
      'language-outline': languageOutline,
      'log-out-outline': logOutOutline,
      'construct-outline': constructOutline,
    });
  }

  ngOnInit() {
    this.authService.getUser().then(user => {

      this.user = user;
      console.log('usuario', this.user);


      /*

      if (user?.language) {
        this.translate.use(user.language);
        console.log('Idioma del usuario aplicado en Home:', user.language);
      }
        */
    });

    this.menuSections = [
    {
    header: 'PROFILE.GENERAL',
    items: [
      {
        label: 'PROFILE.CATEGORIES',
        icon: 'grid-outline',
        action: () => this.navigateTo('/categorias'),
      },
      {
        label: 'PROFILE.FAVORITES',
        icon: 'heart-outline',
        action: () => this.navigateTo('/favoritos'),
      },
      {
        label: 'PROFILE.NOTIFICATIONS',
        icon: 'notifications-outline',
        action: () => this.navigateTo('/notificaciones'),
      },
      {
        label: 'PROFILE.FOLLOW_US',
        icon: 'people-outline',
        action: () => this.navigateTo('/siguenos'),
      },
      {
        label: 'PROFILE.CHANGE_LANGUAGE',
        icon: 'language-outline',
        action: () => this.showLanguageSelector(), // 👈 Aquí el cambio
      },
      {
        label: 'PROFILE.LOGOUT',
        icon: 'log-out-outline',
        action: () => this.logout(),
      },
        ],
      },
    ];
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

editProfile() {
  this.router.navigate(['/editprofile']);
}


  openSettings() {
    console.log('Abrir configuración');
  }

async logout() {
  await Preferences.clear();
  this.router.navigate(['/login']);
}

  onFooterTabChanged(tabName: string) {
    console.log('Footer seleccionó pestaña:', tabName);
    this.activeTab = tabName;
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

async showLanguageSelector() {
  const alert = await this.alertCtrl.create({
    header: this.translate.instant('PROFILE.CHANGE_LANGUAGE'),
    inputs: [
      { type: 'radio', label: 'Español', value: 'es', checked: this.translate.currentLang === 'es' },
      { type: 'radio', label: 'English', value: 'en', checked: this.translate.currentLang === 'en' },
      { type: 'radio', label: 'Português', value: 'pt', checked: this.translate.currentLang === 'pt' },
    ],
    buttons: [
      {
        text: this.translate.instant('CANCEL'),
        role: 'cancel'
      },
      {
        text: this.translate.instant('OK'),
        handler: (selectedLanguage: string) => {
          this.changeLanguage(selectedLanguage);
        }
      }
    ]
  });

  await alert.present();
}

changeLanguage(lang: string) {
  // Cambia idioma local
  this.translate.use(lang);

  // Guarda preferencia en backend
  this.usuariosService.updateLanguageUser(lang).subscribe({
    next: () => {
      console.log('Idioma actualizado exitosamente');
    },
    error: (err) => {
      console.error('Error al actualizar idioma:', err);
    }
  });
}
  goBack() {
        this.location.back();
      }

}
