import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from './../../../services/usuarios-service';
import { AuthService } from './../../../services/auth-service';
import { CarruselComponent } from '../../../components/features/carrusel/carrusel.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NoticiasService } from '../../../services/noticias-service';
import { Noticia } from '../../../models/noticia.model';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonButtons
} from '@ionic/angular/standalone';
import { TranslateModule, TranslateService } from '@ngx-translate/core'; // 👈 añadido
import { addIcons } from 'ionicons';
import { arrowBackOutline, searchOutline, alertCircleOutline,heart, heartOutline, shareOutline } from 'ionicons/icons';

import { IonicModule } from '@ionic/angular';
import { SafePipe } from '../../../pipes/safe.pipe'; // Asegúrate de tenerlo registrado
import { Location } from '@angular/common'; // ✅ ESTA es la correcta
import { CategoriaService } from '../../../services/categorias-service';



@Component({
  selector: 'app-categorias-despliegue',
  templateUrl: './categorias-despliegue.component.html',
  styleUrls: ['./categorias-despliegue.component.scss'],
  standalone: true,
    imports: [
    CommonModule,
    FormsModule,
    CarruselComponent,
    TranslateModule,
    IonicModule
  ]
})
export class CategoriasDespliegueComponent implements OnInit {
  categoriaNombreTraducido = '';
  categoriaImagen: string = '';

    resultados: {
      noticias: Noticia[];
      podcasts: any[];
      shows: any[];
    } = {
      noticias: [],
      podcasts: [],
      shows: [],
    };


  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private usuariosService: UsuariosService,
    private router: Router,
    private location: Location,
    private categoriaService: CategoriaService,
    private noticiasService: NoticiasService
  ) {
    addIcons({
      heart,
      'heart-outline': heartOutline,
      'arrow-back-outline': arrowBackOutline,
      'share-outline': shareOutline,
    });
  }

    ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    this.categoriaNombreTraducido = decodeURIComponent(param || '');

    console.log('Categoría traducida seleccionada:', this.categoriaNombreTraducido);

    // Buscar imagen correspondiente
    this.categoriaService.obtenerCategorias().subscribe({
      next: (categorias) => {
        const match = categorias.find(cat =>
          this.categoriaNombreTraducido.toLowerCase() === cat.name.toLowerCase()
        );
        if (match) {
          this.categoriaImagen = match.image || '';
        }
      },
      error: (err) => {
        console.error('Error cargando imagen de categoría:', err);
      }
    });

    // 🔥 Cargar noticias por categoría seleccionada
    this.noticiasService.getNoticiasInicio([this.categoriaNombreTraducido]).subscribe({
      next: (noticias) => {
        this.resultados.noticias = noticias;
        console.log('Noticias cargadas:', noticias);
      },
      error: (err) => {
        console.error('Error al obtener noticias por categoría:', err);
      }
    });
  }

  verNoticia(id: string) {
    this.router.navigate(['/noticia-despliegue', id]);
  }

  goBack() {
    this.location.back();
  }
}
