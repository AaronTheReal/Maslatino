import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  ToastController
} from '@ionic/angular/standalone';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';
import { TranslateService,TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.page.html',
  styleUrls: ['./select-language.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    CommonModule,
    FormsModule,
    TranslateModule 
  ]
})
export class SelectLanguagePage implements OnInit {
  languages = [
    { name: 'Español', code: 'es' },
    { name: 'Inglés', code: 'en' },
    { name: 'Portugués', code: 'pt' },
  ];

  selectedLanguage: string = 'es';

  constructor(
    private toastController: ToastController,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    // Puedes cargar el idioma por defecto si ya estaba guardado
  }

  selectLanguage(code: string) {
    this.selectedLanguage = code;

    this.translate.use(code);
  }

  getFlagUrl(code: string): string {
    return `/assets/flags/${code}.png`;
  }

  async onContinue() {
    // 🔒 Guarda la preferencia para siguientes sesiones
    await Preferences.set({
      key: 'selectedLanguage',
      value: this.selectedLanguage
    });

    const toast = await this.toastController.create({
      message: this.translate.instant('LANGUAGE_SELECTED') + ': ' + this.selectedLanguage,
      duration: 2000
    });
    await toast.present();

    // 🚀 Continua con el flujo
    this.router.navigate(['/intro-tour']);
  }
}
