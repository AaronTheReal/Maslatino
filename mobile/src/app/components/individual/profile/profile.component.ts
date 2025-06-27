import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
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

interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
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
    FooterComponent
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

  constructor(private router: Router) {
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
    this.menuSections = [
      {
        header: 'General',
        items: [
          {
            label: 'Categorías',
            icon: 'grid-outline',
            action: () => this.navigateTo('/categorias'),
          },
          {
            label: 'Favoritos',
            icon: 'heart-outline',
            action: () => this.navigateTo('/favoritos'),
          },
          {
            label: 'Notificaciones',
            icon: 'notifications-outline',
            action: () => this.navigateTo('/notificaciones'),
          },
          {
            label: 'Síguenos',
            icon: 'people-outline',
            action: () => this.navigateTo('/siguenos'),
          },
          {
            label: 'Cambiar idioma',
            icon: 'language-outline',
            action: () => this.navigateTo('/settings/language'),
          },
          /*
          {
            label: 'Admin-Panel',
            icon: 'construct-outline',
            action: () => this.navigateTo('/admin-panel'),
          },
          */
          {
            label: 'Cerrar sesión',
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
    this.router.navigate(['/profile/edit']);
  }

  openSettings() {
    console.log('Abrir configuración');
  }

  logout() {
    console.log('Cerrar sesión');
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
}