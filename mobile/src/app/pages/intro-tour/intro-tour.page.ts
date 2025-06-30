import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton
} from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-intro-tour',
  templateUrl: './intro-tour.page.html',
  styleUrls: ['./intro-tour.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    TranslateModule,
    CommonModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IntroTourPage implements OnInit {
  currentLanguage = '';

  constructor(
    private router: Router,
    private translate: TranslateService 
  ) {}

  ngOnInit() {
  this.currentLanguage = this.translate.currentLang;
  console.log('Idioma actual:', this.currentLanguage);

  // 👇 Fuerza la aplicación del idioma activo
  if (this.currentLanguage) {
    this.translate.use(this.currentLanguage);
  }
  }

  proceed() {
    this.router.navigate(['/login']);
  }
}
