import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from './../../../services/usuarios-service';
import { AuthService } from './../../../services/auth-service';

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



@Component({
  selector: 'app-categorias-despliegue',
  templateUrl: './categorias-despliegue.component.html',
  styleUrls: ['./categorias-despliegue.component.scss'],
  standalone: true,
    imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule
  ]
})
export class CategoriasDespliegueComponent implements OnInit {
  categoriaNombreTraducido = '';
  resultados: {
    noticias: any[],
    podcasts: any[],
    shows: any[]
  } = {
    noticias: [],
    podcasts: [],
    shows: []
  };
  constructor(private route: ActivatedRoute, 
    private authService: AuthService, 
    private usuariosService: UsuariosService, 
    private router: Router,
    private location: Location

  ) {


      addIcons({
        heart,
        'heart-outline': heartOutline,
        'arrow-back-outline': arrowBackOutline,
        'share-outline': shareOutline
      });
  }

 ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    this.categoriaNombreTraducido = decodeURIComponent(param || '');

    console.log('Categoría traducida seleccionada:', this.categoriaNombreTraducido);

    // Llamada al backend (por ejemplo para obtener favoritos de esta categoría)
    this.usuariosService.getByCategory(this.categoriaNombreTraducido).subscribe({
      next: (res) => {
        console.log('Datos recibidos:', res);
        this.resultados = res;
        console.log("resultados",this.resultados);
      },
      error: (err) => {
        console.error('Error al obtener datos:', err);
      }
    });
  }

       goBack() {
        this.location.back();
      }
}
