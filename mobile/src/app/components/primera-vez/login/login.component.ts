import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router) {}

  async loginWith(provider: 'google' | 'facebook' | 'apple') {
    if (provider === 'google') {
      try {
        const user = await GoogleAuth.signIn();
        console.log('Usuario:', user);
        localStorage.setItem('user', JSON.stringify(user));
        // aquí podrías redirigir al home:
        // this.router.navigate(['/home']);
      } catch (err) {
        console.error('Error al iniciar sesión con Google:', err);
      }
    } else {
      alert(`${provider} aún no implementado.`);
    }
  }

  recoverPassword() {
    // reemplaza la ruta por la que tengas configurada
    this.router.navigate(['/recover-password']);
  }

  goToRegister() {
    // reemplaza la ruta por la que tengas configurada
    this.router.navigate(['/register']);
  }
}
