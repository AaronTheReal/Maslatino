import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { ToastController, IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule,ReactiveFormsModule]
})
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

  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: async () => {
          const toast = await this.toastController.create({
            message: 'Bienvenido!',
            duration: 2000,
            color: 'success'
          });
          toast.present();
          this.router.navigate(['/home']); // o donde quieras ir después del login
        },
        error: async (err) => {
          const toast = await this.toastController.create({
            message: 'Login fallido. Verifica tus datos.',
            duration: 3000,
            color: 'danger'
          });
          toast.present();
        }
      });
    }
  }
}
