import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsuariosService, Usuario } from '../../services/usuarios-service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule
  ]
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuariosService: UsuariosService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get name() { return this.registerForm.get('name')!; }
  get gender() { return this.registerForm.get('gender')!; }
  get country() { return this.registerForm.get('country')!; }
  get email() { return this.registerForm.get('email')!; }
  get password() { return this.registerForm.get('password')!; }

  async onSubmit() {
    if (this.registerForm.valid) {
      const nuevoUsuario: Usuario = {
        name: this.name.value,
        email: this.email.value,
        password: this.password.value,
        gender: this.gender.value,
        country: this.country.value,
        provider: 'email', // <- por defecto si no es social
        providerId: '', // <- podrías generar uno si lo usas
        avatar: '',
        categories: [], // <- vacío por ahora, luego se puede seleccionar
        language: 'es'
      };
      console.log("información usuario",nuevoUsuario)

      this.usuariosService.createUsuario(nuevoUsuario).subscribe({
        next: async () => {
          const toast = await this.toastController.create({
            message: 'Registro exitoso.',
            duration: 2000,
            color: 'success'
          });
          await toast.present();
          this.router.navigate(['/login']);
        },
        error: async (err) => {
          console.error('Error en registro', err);
          const toast = await this.toastController.create({
            message: 'Error al registrar. Intenta más tarde.',
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
}
