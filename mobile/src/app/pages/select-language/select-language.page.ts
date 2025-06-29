import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonGrid, IonRow, IonCol, ToastController } from '@ionic/angular/standalone';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.page.html',
  styleUrls: ['./select-language.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonGrid, IonRow, IonCol, CommonModule, FormsModule]
})
export class SelectLanguagePage implements OnInit {
  languages = [
    { name: 'Español', code: 'es' },
    { name: 'Inglés', code: 'en' },
    { name: 'Portugués', code: 'pt' },
  ];
  selectedLanguage: string = 'es'; // Español por defecto

  constructor(private toastController: ToastController, private router: Router) {}

  ngOnInit() {
    // No verificamos autenticación aquí, permitimos que el usuario continúe
  }

  selectLanguage(code: string) {
    this.selectedLanguage = code;
  }

  getFlagUrl(code: string): string {
  return `/assets/flags/${code}.png`;
}



  async onContinue() {
    // Guardar el idioma seleccionado en Storage
    await Preferences.set({ key: 'selectedLanguage', value: this.selectedLanguage });

    
    const toast = await this.toastController.create({
      message: 'Idioma seleccionado: ' + this.selectedLanguage,
      duration: 2000,
      cssClass: 'custom-toast'  // Aquí defines tu clase personalizada
    });
    await toast.present();
    // Redirigir a la siguiente pantalla del flujo de bienvenida
    this.router.navigate(['/intro-tour']);
  }
}
