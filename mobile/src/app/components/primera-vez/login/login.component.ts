
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    loginForm: FormGroup;

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }
  loginWith(provider: string) {
    console.log('Login con', provider);
  }

  recoverPassword() {
    console.log('Recuperar contraseña');
  }

  goToRegister() {
    console.log('Ir a registro');
  }
    onSubmit() {
    if (this.loginForm.valid) {
      console.log('Formulario enviado', this.loginForm.value);
      // Aquí puedes agregar la lógica para enviar el formulario
    }
  }
}
