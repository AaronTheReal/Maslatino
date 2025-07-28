import { Component, OnInit } from '@angular/core';
import { Noticia } from '../../../models/noticia.model';
import { NoticiasService } from '../../../services/noticias-service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { arrowBackOutline, searchOutline, alertCircleOutline } from 'ionicons/icons';
import { UsuariosService } from '../../../services/usuarios-service';
import { AuthService } from '../../../services/auth-service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-noticia-despliegue',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './noticia-despliegue.component.html',
  styleUrls: ['./noticia-despliegue.component.scss']
})
export class NoticiaDespliegueComponent implements OnInit {
  noticia?: Noticia;
  user: any;
  isFavorite = false;
  loading = true;

  constructor(
    private noticiasService: NoticiasService,
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuariosService,
    private authService: AuthService,
    private location: Location
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
          this.loading = false;

          // Cargar usuario y favorito después para no bloquear el render
          this.authService.getUser().then(user => {
            this.user = user;
            const noticiaId = this.noticia?._id;
            const tipo = 'Noticia';
            const idUsuario = this.user._id;

            if (!noticiaId) return;

            this.usuarioService.isFavorite(noticiaId, tipo, idUsuario).subscribe({
              next: res => {
                this.isFavorite = res.isFavorite;
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
          this.loading = false;
        }
      });
    }
  }

  toggleFavorite() {
    this.authService.getUser().then(user => {
      this.user = user;
      const noticiaId = this.noticia?._id;
      if (!noticiaId) return;

      const tipo = "Noticia";
      const idUsuario = this.user._id;

      const accion = this.isFavorite
        ? this.usuarioService.removeFavorite(noticiaId, tipo, idUsuario)
        : this.usuarioService.addFavoriteToUse(noticiaId, tipo, idUsuario);

      accion.subscribe({
        next: () => this.isFavorite = !this.isFavorite,
        error: err => console.error("Error al cambiar estado de favorito", err)
      });

    }).catch(err => console.error("Error al obtener el usuario", err));
  }

  goBack() {
    this.location.back();
  }
}
