import { Component, OnInit } from '@angular/core';
import { Noticia } from '../../../models/noticia.model';
import { NoticiasService } from '../../../services/noticias-service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular'; // <-- AQUI
import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { arrowBackOutline, searchOutline, alertCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-noticia-despliegue',
  standalone: true,
  imports: [CommonModule, IonicModule], // <-- AGREGA AQUI TAMBIÉN
  templateUrl: './noticia-despliegue.component.html',
  styleUrls: ['./noticia-despliegue.component.scss']
})
export class NoticiaDespliegueComponent implements OnInit {
  noticia?: Noticia;

  constructor(
    private noticiasService: NoticiasService,
    private route: ActivatedRoute,
    private router: Router
  ) {


 

   addIcons({
       heart,
      'heart-outline': heartOutline,
      'arrow-back-outline': arrowBackOutline,
      'search-outline': searchOutline,
      'alert-circle-outline': alertCircleOutline
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.noticiasService.getNoticia([id]).subscribe({
        next: (data) => {
          this.noticia = data[0];
          console.log('Noticia recibida:', this.noticia);
        },
        error: (err) => {
          console.error('Error al obtener la noticia:', err);
        }
      });
    }
  }

  isFavorite = false;

toggleFavorite() {
  this.isFavorite = !this.isFavorite;
}
  goBack(): void {
    this.router.navigate(['/home']);
  }
  
}
