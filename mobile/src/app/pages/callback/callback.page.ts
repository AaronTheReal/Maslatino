import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonSpinner,
} from '@ionic/angular/standalone';
import { SpotifyAuthService } from '../../services/spotify-auth.service'; // Ajusta la ruta según tu proyecto

@Component({
  selector: 'app-callback',
  template: `
    <ion-content class="ion-padding">
      <ion-spinner name="crescent"></ion-spinner>
      <p>Finalizando login...</p>
    </ion-content>
  `,
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonSpinner,
  ],
})
export class CallbackPage implements OnInit {
  constructor(
    private router: Router,
    private spotifyAuth: SpotifyAuthService // Servicio para manejar la autenticación
  ) {}

async ngOnInit() {
  console.log('🔍 Iniciando proceso de callback con URL:', window.location.href);
  try {
    console.log('🔐 Intentando autenticar con Spotify...');
    await this.spotifyAuth.getClient().authenticate();
    console.log('✅ Autenticación completada');
    const token = await this.spotifyAuth.getAccessToken();
    if (token) {
      console.log('✅ Token obtenido:', token);
      this.router.navigateByUrl('/home');
    } else {
      console.error('❌ No se pudo obtener el token de acceso');
      this.router.navigateByUrl('/login') 
    }
  } catch (error) {
    console.error('❌ Error durante la autenticación:', error);
    this.router.navigateByUrl('/login');
  }
}
}