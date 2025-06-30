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
import { UsuariosService } from '../../../services/usuarios-service';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-noticia-despliegue',
  standalone: true,
  imports: [CommonModule, IonicModule], // <-- AGREGA AQUI TAMBIÉN
  templateUrl: './noticia-despliegue.component.html',
  styleUrls: ['./noticia-despliegue.component.scss']
})
export class NoticiaDespliegueComponent implements OnInit {
  noticia?: Noticia;
  user: any;
  isFavorite = false;


  constructor(
    private noticiasService: NoticiasService,
    private route: ActivatedRoute,
    private router: Router, 
    private usuarioService: UsuariosService,
    private authService: AuthService
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

        // Ahora que ya tenemos la noticia, obtenemos el usuario
        this.authService.getUser().then(user => {
          this.user = user;

          const noticiaId = this.noticia?._id;
          const tipo = 'Noticia';
          const idUsuario = this.user._id;

          if (!noticiaId) return;

          this.usuarioService.isFavorite(noticiaId, tipo, idUsuario).subscribe({
            next: res => {
              this.isFavorite = res.isFavorite;
              console.log("¿Es favorito?", this.isFavorite);
            },
            error: err => {
              console.error("Error al verificar favorito", err);
            }
          });

        }).catch(err => {
          console.error("Error al obtener usuario", err);
        });
      },
      error: (err) => {
        console.error('Error al obtener la noticia:', err);
      }
    });
  }
}



toggleFavorite() {
  this.authService.getUser().then(user => {
    this.user = user;
    const noticiaId = this.noticia?._id;

    if (!noticiaId) {
      console.error('ID de la noticia no está definido');
      return;
    }

    const tipo = "Noticia";
    const idUsuario = this.user._id;

    console.log("Datos", this.user);

    const accion = this.isFavorite
      ? this.usuarioService.removeFavorite(noticiaId, tipo, idUsuario)
      : this.usuarioService.addFavoriteToUse(noticiaId, tipo, idUsuario);

    accion.subscribe({
      next: res => {
        console.log("Cambio de favorito realizado con éxito", res);
        this.isFavorite = !this.isFavorite;
      },
      error: err => {
        console.error("Error al cambiar estado de favorito", err);
      }
    });
  }).catch(err => {
    console.error("Error al obtener el usuario", err);
  });
}



  goBack(): void {
    this.router.navigate(['/home']);
  }
  
}
