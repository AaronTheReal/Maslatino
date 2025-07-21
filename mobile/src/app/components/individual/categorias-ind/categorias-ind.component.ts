import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBackOutline, searchOutline, alertCircleOutline } from 'ionicons/icons';
import { Location } from '@angular/common';


@Component({
  selector: 'app-categorias-ind',
  templateUrl: './categorias-ind.component.html',
  styleUrls: ['./categorias-ind.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, TranslateModule],
})
export class CategoriasIndComponent implements OnInit {
  sampleCategories: Array<{ key: string; color: string }> = [];

  constructor(public translate: TranslateService, private router: Router,private location: Location) {
  addIcons({
      'arrow-back-outline': arrowBackOutline,
      'search-outline': searchOutline,
      'alert-circle-outline': alertCircleOutline
    });
  }



  ngOnInit() {
    this.sampleCategories = [
      { key: 'CATEGORY.ART', color: '#1abc9c' },
      { key: 'CATEGORY.SPORTS', color: '#9b59b6' },
      { key: 'CATEGORY.WORLD', color: '#e74c3c' },
      { key: 'CATEGORY.POLITICIAN', color: '#f39c12' },
      { key: 'CATEGORY.Finanzas', color: '#2ecc71' },
      { key: 'CATEGORY.HEALTH', color: '#34495e' },
      { key: 'CATEGORY.FAMILY', color: '#e67e22' },
    ];
  }

  goToCategoria(cat: { key: string }) {
    this.translate.get(cat.key).subscribe(translatedName => {
      const urlSafeName = encodeURIComponent(translatedName); // manejar espacios o tildes
      console.log("Nombre traducido")
      this.router.navigate(['/categorias-despliegue', urlSafeName]);
    });
  }

    goBack() {
    this.location.back();
  }
}
