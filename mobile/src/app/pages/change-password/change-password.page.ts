import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule]
})
export class ChangePasswordPage implements OnInit {
  resetForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.resetForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.resetForm.valid) {
      console.log('Password reset:', this.resetForm.value);
      // Aquí puedes hacer el POST al backend
    }
  }

  goBack() {
    this.router.navigate(['/login']);
  }
}





