import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginWith(provider: string) {
    console.log('Login con', provider);
  }

  recoverPassword() {
    console.log('Recuperar contraseña');
  }

  goToRegister() {
    console.log('Ir a registro');
  }
}
