import { Component, OnInit } from '@angular/core';
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
import { Preferences } from '@capacitor/preferences';

import { AuthService } from '../../services/auth-service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

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
    IonButton,
    TranslateModule
  ]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  currentLanguage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private translate: TranslateService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit() {
    const lang = this.translate.currentLang || 'es';
    this.translate.use(lang);
    this.currentLanguage = lang;
    console.log('Idioma (forzado) en login:', lang);
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
            message: this.translate.instant('LOGIN_SUCCESS'),
            duration: 2000,
            cssClass: 'custom-toast'
          });
          await toast.present();

          // 🔍 Verificar si ya hizo onboarding
          const existing = await Preferences.get({ key: 'hasCompletedOnboarding' });
          const isReturningUser = !!existing.value;

          // Si no lo tenía, lo marcamos como completado
          if (!isReturningUser) {
            await Preferences.set({ key: 'hasCompletedOnboarding', value: 'true' });
          }

          // Guardamos el idioma si viene del backend
          const user = res?.user;
          if (user?.language) {
            await Preferences.set({ key: 'selectedLanguage', value: user.language });
            this.translate.use(user.language);
          }

          // ✅ Navegación condicional
          if (isReturningUser) {
            this.router.navigate(['/home']);
          } else {
            this.router.navigate(['/bienvenida']);
          }
        },
        error: async (err) => {
          const toast = await this.toastController.create({
            message: this.translate.instant('LOGIN_ERROR'),
            duration: 3000,
            color: 'danger'
          });
          await toast.present();
        }
      });
    }
  }
}


/*
  async onSubmit() {
  if (this.loginForm.valid) {
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: async (res) => {
        const toast = await this.toastController.create({
          message: this.translate.instant('LOGIN_SUCCESS'),
          duration: 2000,
          cssClass: 'custom-toast'
        });
        await toast.present();

        // ✅ Aquí validamos si ya existe la clave antes de sobrescribirla
        const existing = await Preferences.get({ key: 'hasCompletedOnboarding' });
        if (!existing.value) {
          await Preferences.set({ key: 'hasCompletedOnboarding', value: 'true' });
        }

        // 🔥 Opcional: guardar idioma si está en el usuario
        const user = res?.user;
        if (user?.language) {
          await Preferences.set({ key: 'selectedLanguage', value: user.language });
          this.translate.use(user.language);
        }

        // ✅ Corrección crítica: redirigir a home, no a bienvenida
        this.router.navigate(['/home']);
      },
      error: async (err) => {
        const toast = await this.toastController.create({
          message: this.translate.instant('LOGIN_ERROR'),
          duration: 3000,
          color: 'danger'
        });
        await toast.present();
      }
    });
  }
}
*/


/*
import { Component, OnInit } from '@angular/core';
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
import { Preferences } from '@capacitor/preferences';

import { AuthService } from '../../services/auth-service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

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
    IonButton,
    TranslateModule
  ]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  currentLanguage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private translate: TranslateService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit() {
    const lang = this.translate.currentLang || 'es';
    this.translate.use(lang);
    this.currentLanguage = lang;
    console.log('Idioma (forzado) en login:', lang);
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
            message: this.translate.instant('LOGIN_SUCCESS'),
            duration: 2000,
            cssClass: 'custom-toast'
          });
          await toast.present();

          // 🔍 Verificar si ya hizo onboarding
          const existing = await Preferences.get({ key: 'hasCompletedOnboarding' });
          const isReturningUser = !!existing.value;

          // Si no lo tenía, lo marcamos como completado
          if (!isReturningUser) {
            await Preferences.set({ key: 'hasCompletedOnboarding', value: 'true' });
          }

          // Guardamos el idioma si viene del backend
          const user = res?.user;
          if (user?.language) {
            await Preferences.set({ key: 'selectedLanguage', value: user.language });
            this.translate.use(user.language);
          }

          // ✅ Navegación condicional
          if (isReturningUser) {
            this.router.navigate(['/home']);
          } else {
            this.router.navigate(['/bienvenida']);
          }
        },
        error: async (err) => {
          const toast = await this.toastController.create({
            message: this.translate.instant('LOGIN_ERROR'),
            duration: 3000,
            color: 'danger'
          });
          await toast.present();
        }
      });
    }
  }
}

*/

/*
import { Component,OnInit } from '@angular/core';
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
import { Preferences } from '@capacitor/preferences';

import { AuthService } from '../../services/auth-service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

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
    IonButton,
    TranslateModule
  ]})
export class LoginPage implements OnInit{
  loginForm: FormGroup;
  currentLanguage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private translate: TranslateService 

  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }
 ngOnInit() {
  const lang = this.translate.currentLang || 'es';
  this.translate.use(lang); // ← siempre se llama
  this.currentLanguage = lang;
  console.log('Idioma (forzado) en login:', lang);
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
          message: this.translate.instant('LOGIN_SUCCESS'),
          duration: 2000,
          cssClass: 'custom-toast'
        });
        await toast.present();

        const existing = await Preferences.get({ key: 'hasCompletedOnboarding' });

        let goToBienvenida = false;

        // ✅ Solo la primera vez: marcamos como completado y vamos a bienvenida
        if (!existing.value) {
          await Preferences.set({ key: 'hasCompletedOnboarding', value: 'true' });
          goToBienvenida = true;
        }

        // 🔥 Guardamos el idioma si viene del backend
        const user = res?.user;
        if (user?.language) {
          await Preferences.set({ key: 'selectedLanguage', value: user.language });
          this.translate.use(user.language);
        }

        // ✅ Navegación condicional
        if (goToBienvenida) {
                    this.router.navigate(['/home']);

        } else {
                    this.router.navigate(['/bienvenida']);

        }
      },
      error: async (err) => {
        const toast = await this.toastController.create({
          message: this.translate.instant('LOGIN_ERROR'),
          duration: 3000,
          color: 'danger'
        });
        await toast.present();
      }
    });
  }
}

}
*/

/*
  async onSubmit() {
  if (this.loginForm.valid) {
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: async (res) => {
        const toast = await this.toastController.create({
          message: this.translate.instant('LOGIN_SUCCESS'),
          duration: 2000,
          cssClass: 'custom-toast'
        });
        await toast.present();

        // ✅ Aquí validamos si ya existe la clave antes de sobrescribirla
        const existing = await Preferences.get({ key: 'hasCompletedOnboarding' });
        if (!existing.value) {
          await Preferences.set({ key: 'hasCompletedOnboarding', value: 'true' });
        }

        // 🔥 Opcional: guardar idioma si está en el usuario
        const user = res?.user;
        if (user?.language) {
          await Preferences.set({ key: 'selectedLanguage', value: user.language });
          this.translate.use(user.language);
        }

        // ✅ Corrección crítica: redirigir a home, no a bienvenida
        this.router.navigate(['/home']);
      },
      error: async (err) => {
        const toast = await this.toastController.create({
          message: this.translate.instant('LOGIN_ERROR'),
          duration: 3000,
          color: 'danger'
        });
        await toast.present();
      }
    });
  }
}
*/