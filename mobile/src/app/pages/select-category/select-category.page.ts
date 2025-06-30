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
  selector: 'app-select-category',
  templateUrl: './select-category.page.html',
  styleUrls: ['./select-category.page.scss'],
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
export class SelectCategoryPage implements OnInit {
 categorias = [
    { name: 'Diseño', code: 'dis' },
    { name: 'Negocios', code: 'neg' },
    { name: 'Management', code: 'mng' },
    { name: 'Estilo de Vida', code: 'vida' },
    { name: 'Arte', code: 'art' },
    { name: 'Automotive', code: 'aut' },
    { name: 'Moda', code: 'mod' },
    { name: 'Tecnologia', code: 'tec' },
    { name: 'Gadget', code: 'gad' },
    { name: 'Noticias', code: 'not' },
    { name: 'Ciencia', code: 'cie' },
    { name: 'Non-Profit', code: 'npr' },
    { name: 'Deporte', code: 'dep1' },
    { name: 'Religion', code: 'rel' },
    { name: 'Libros', code: 'lib' },
    { name: 'Salud mental', code: 'sal' },
    { name: 'Deporte', code: 'dep2' },
    { name: 'Comedia', code: 'com' },
  ];

    selectedCategories: string[] = [];


  randomColors = [
  'primary',
  'secondary',
  'tertiary',
  'success',
  'warning',
  'danger',
  'medium',
  'dark'
];

  selectedCategory: string = 'dis';

  constructor(
    private toastController: ToastController,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    // Puedes cargar el idioma por defecto si ya estaba guardado
  }

toggleCategory(code: string) {
  const index = this.selectedCategories.indexOf(code);
  if (index >= 0) {
    this.selectedCategories.splice(index, 1); // Deseleccionar
  } else {
    this.selectedCategories.push(code); // Seleccionar
  }
}

isSelected(code: string): boolean {
  return this.selectedCategories.includes(code);
}



  async onContinue() {
    // 🔒 Guarda la preferencia para siguientes sesiones
    await Preferences.set({
      key: 'selectedCategory',
      value: this.selectedCategory
    });

    const toast = await this.toastController.create({
      message: this.translate.instant('CATEGORY_SELECTED') + ': ' + this.selectedCategory,
      duration: 2000
    });
    await toast.present();

    // 🚀 Continua con el flujo
    // this.router.navigate(['/intro-tour']);
  }
}
