import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
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
import { IonicModule } from '@ionic/angular';

import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  searchOutline,
  alertCircleOutline,
  heart,
  heartOutline,
  shareOutline
} from 'ionicons/icons';

import { UsuariosService } from './../../../services/usuarios-service';
import { AuthService } from './../../../services/auth-service';
import { CategoriaService } from '../../../services/categorias-service';
import { NoticiasService } from '../../../services/noticias-service';
import { PodcastService } from '../../../services/spotify-podcasts';
import { CarruselComponent } from '../../../components/features/carrusel/carrusel.component';
import { SafePipe } from '../../../pipes/safe.pipe';
import { Noticia } from '../../../models/noticia.model';

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
    private router: Router,
    private location: Location,
    private authService: AuthService,
    private usuariosService: UsuariosService,
    private categoriaService: CategoriaService,
    private noticiasService: NoticiasService,
    private podcastService: PodcastService,
    private translate: TranslateService
  ) {
    addIcons({
      heart,
      'heart-outline': heartOutline,
      'arrow-back-outline': arrowBackOutline,
      'share-outline': shareOutline,
    });
  }

  ngOnInit() {
    const categoriaId = this.route.snapshot.paramMap.get('id');
    if (!categoriaId) return;

    // Obtener categoría completa desde el servicio usando el ID
    this.categoriaService.obtenerCategorias().subscribe({
      next: (categorias) => {
        const categoria = categorias.find(cat => cat._id === categoriaId);

        if (categoria) {
          this.categoriaImagen = categoria.image || '';

          this.translate.get(categoria.name).subscribe(traducido => {
            this.categoriaNombreTraducido = traducido;
          });

          // 🔥 Cargar contenido desde servicios usando el ID (ajusta si es necesario)
          this.cargarNoticiasPorCategoriaId(categoriaId);
          this.cargarPodcastsPorCategoriaId(categoriaId);
        } else {
          console.error('No se encontró la categoría con ID:', categoriaId);
        }
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
      }
    });
  }

  private cargarNoticiasPorCategoriaId(categoriaId: string) {
    this.noticiasService.getNoticiasPorCategoriaId(categoriaId).subscribe({
      next: (noticias) => {
        this.resultados.noticias = noticias;
        console.log('Noticias cargadas:', noticias);
      },
      error: (err) => {
        console.error('Error al obtener noticias por categoría:', err);
      }
    });
  }

  private cargarPodcastsPorCategoriaId(categoriaId: string) {
    this.podcastService.getPodcastCategoriaPorId(categoriaId).subscribe({
      next: (response) => {
        const podcasts = Array.isArray(response)
          ? response
          : response.results;

        this.resultados.podcasts = podcasts;
        console.log('Podcasts cargados:', podcasts);
      },
      error: (err) => {
        console.error('Error al obtener podcasts por categoría:', err);
      }
    });
}


  verNoticia(id: string) {
    this.router.navigate(['/noticia-despliegue', id]);
  }

  verPodcast(id: string) {
    this.router.navigate(['/podcast-despliegue', id]);
  }

  goBack() {
    this.location.back();
  }
}
