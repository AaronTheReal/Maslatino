import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBackOutline, searchOutline, alertCircleOutline } from 'ionicons/icons';
import { Location } from '@angular/common';
import { CategoriaService, CategoriaPayload } from '../../../services/categorias-service';

@Component({
  selector: 'app-categorias-ind',
  templateUrl: './categorias-ind.component.html',
  styleUrls: ['./categorias-ind.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, TranslateModule],
})
export class CategoriasIndComponent implements OnInit {
  categorias: CategoriaPayload[] = [];

  constructor(
    public translate: TranslateService,
    private router: Router,
    private location: Location,
    private categoriaService: CategoriaService
  ) {
    addIcons({
      'arrow-back-outline': arrowBackOutline,
      'search-outline': searchOutline,
      'alert-circle-outline': alertCircleOutline,
    });
  }

  ngOnInit() {
    this.categoriaService.obtenerCategorias().subscribe({
      next: (res) => {
        this.categorias = res || [];
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
      }
    });
  }

  goToCategoria(cat: CategoriaPayload) {
  
          this.router.navigate(['/categorias-despliegue', cat._id]);

  }

  goBack() {
    this.location.back();
  }
}
