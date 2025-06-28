import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonInput,
  IonButton,
  ToastController,
} from '@ionic/angular/standalone';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@capacitor/storage';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonInput,
    IonButton
  ]})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  registrarse() {
    this.router.navigate(['/register']);
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: async (res) => {
          const toast = await this.toastController.create({
            message: '¡Bienvenido!',
            duration: 2000,
            color: 'success'
          });
          await toast.present();

          await Storage.set({ key: 'hasCompletedOnboarding', value: 'true' });

          // 🔥 Opcional: guardar el idioma actual del usuario
          const user = res?.user;
          if (user?.language) {
            await Storage.set({ key: 'selectedLanguage', value: user.language });
          }

          this.router.navigate(['/bienvenida']);
        },
        error: async (err) => {
          const toast = await this.toastController.create({
            message: 'Login fallido. Verifica tus datos.',
            duration: 3000,
            color: 'danger'
          });
          await toast.present();
        }
      });
    }
  }
}
