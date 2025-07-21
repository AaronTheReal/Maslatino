import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonInput,
  IonRadio,
  IonRadioGroup,
  IonLabel,
  IonText,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon,
  ToastController
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { UsuariosService, Usuario } from '../../services/usuarios-service';
import { Preferences } from '@capacitor/preferences';
import { TranslateService, TranslateModule } from '@ngx-translate/core'; // 👈

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonInput,
    IonRadio,
    IonRadioGroup,
    IonLabel,
    IonText,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonIcon,
    TranslateModule // 👈 ¡IMPORTANTE!
  ]
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;
  currentLanguage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuariosService: UsuariosService,
    private toastController: ToastController,
    private translate: TranslateService // 👈
  ) {}

  ngOnInit() {
    this.currentLanguage = this.translate.currentLang || 'es';
    this.translate.use(this.currentLanguage);
    console.log('Idioma actual en register:', this.currentLanguage);

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatchValidator });

  }

  get name() { return this.registerForm.get('name')!; }
  get gender() { return this.registerForm.get('gender')!; }
  get country() { return this.registerForm.get('country')!; }
  get email() { return this.registerForm.get('email')!; }
  get password() { return this.registerForm.get('password')!; }

  async onSubmit() {
    if (this.registerForm.valid) {
      const { value: storedLanguage } = await Preferences.get({ key: 'selectedLanguage' });
      const allowedLanguages = ['es', 'en', 'fr', 'pt'] as const;
      const selectedLanguage = allowedLanguages.includes(storedLanguage as any)
        ? storedLanguage as (typeof allowedLanguages)[number]
        : 'es';

      const nuevoUsuario: Usuario = {
        name: this.name.value,
        email: this.email.value,
        password: this.password.value,
        gender: this.gender.value,
        country: this.country.value,
        provider: 'email',
        providerId: this.email.value,
        avatar: '',
        categories: [],
        language: selectedLanguage
      };

      this.usuariosService.createUsuario(nuevoUsuario).subscribe({
        next: async () => {
          const toast = await this.toastController.create({
            message: this.translate.instant('REGISTER_SUCCESS'),
            duration: 2000,
            color: 'success'
          });
          await toast.present();

          await Preferences.set({ key: 'hasCompletedOnboarding', value: 'true' });
          this.router.navigate(['/bienvenida']);
        },
        error: async (err) => {
          console.error('Error en registro', err);
          const toast = await this.toastController.create({
            message: this.translate.instant('REGISTER_ERROR'),
            duration: 2500,
            color: 'danger'
          });
          await toast.present();
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  goBack() {
    this.router.navigate(['/login']);
  }

  private passwordsMatchValidator(formGroup: FormGroup) {
  const password = formGroup.get('password')?.value;
  const confirmPassword = formGroup.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordMismatch: true };
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword')!;
  }

}
