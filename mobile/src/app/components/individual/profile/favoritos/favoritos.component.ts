import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../../services/usuarios-service';
import { AuthService } from '../../../../services/auth-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { arrowBackOutline, searchOutline, alertCircleOutline } from 'ionicons/icons';

import {
  createOutline,
  settingsOutline,
  gridOutline,
  heartOutline,
  notificationsOutline,
  peopleOutline,
  languageOutline,
  logOutOutline,
  constructOutline
} from 'ionicons/icons';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonAvatar,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonButtons,       // Añadido para <ion-buttons>
  IonListHeader,    // Añadido para <ion-list-header>
  IonFooter         // Añadido para <ion-footer>
} from '@ionic/angular/standalone';
import { Preferences } from '@capacitor/preferences';
import { TranslateModule, TranslateService } from '@ngx-translate/core'; // 👈 añadido
import { Location } from '@angular/common'; // ✅ ESTA es la correcta

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss'],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
      CommonModule,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonCard,
      IonAvatar,
      IonButton,
      IonIcon,
      IonList,
      IonItem,
      IonLabel,
      IonButtons,       // Añadido
      IonListHeader,    // Añadido
      IonFooter,        // Añadido
  
      TranslateModule,
      
    ],
})
export class FavoritosComponent implements OnInit {
  searchTerm = '';
  noticias: any[] = [];
  podcasts: any[] = [];
  shows: any[] = [];
  combinados: any[] = [];

categoriasDisponibles: string[] = [
  'Todos', 'Mundo', 'Arte', 'Política', 'Finanzas', 'Familia', 'Deportes', 'Salud', 'Educación'
];
categoriaSeleccionada: string = 'Todos';

tiposDisponibles: string[] = ['', 'Noticia', 'Podcast', 'Show'];
tipoSeleccionado: string = '';
  constructor(
    private usuarioService: UsuariosService,
    private authService: AuthService,
    private router: Router,
    private location: Location
  ) {

     addIcons({
  'arrow-back-outline': arrowBackOutline,
  'search-outline': searchOutline,
  'alert-circle-outline': alertCircleOutline
});
  }

ngOnInit() {
  this.authService.getUser().then(user => {
    this.usuarioService.getFavorites(user._id).subscribe({
      next: (res) => {
        this.noticias = (res.noticias || []).map(n => ({
        ...n,
        tipo: 'Noticia',
        categoria: n.categories[0] || 'Otros'
      }));
      this.podcasts = (res.podcasts || []).map(p => ({
        ...p,
        tipo: 'Podcast',
        categoria: p.categories[0] || 'Otros'
      }));
      this.shows = (res.shows || []).map(s => ({
        ...s,
        tipo: 'Show',
        categoria: s.categories[0] || 'Otros'
      }));
        this.combinados = [...this.noticias, ...this.podcasts, ...this.shows];

        console.log("combinados", this.combinados);
      },
      error: (err) => {
        console.error('Error al cargar favoritos:', err);
      }
    });
  });
}

get resultadosFiltrados(): any[] {
  return this.combinados.filter(item => {
    // 🔎 Filtro por término de búsqueda
    const coincideTexto = (() => {
      if (!this.searchTerm.trim()) return true;
      const texto = (item.title || '')
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const regex = this.searchTerm
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .split(/\s+/)
        .filter(p => p.length > 1)
        .map(p => `(${p})`)
        .join('|');
      return new RegExp(regex, 'i').test(texto);
    })();

    // 🏷️ Filtro por categoría (si no es "Todos")
    const coincideCategoria = this.categoriaSeleccionada === 'Todos'
      || (item.categoria?.toLowerCase?.() === this.categoriaSeleccionada.toLowerCase());

    // 📎 Filtro por tipo (si está seleccionado)
    const coincideTipo = this.tipoSeleccionado === ''
      || item.tipo === this.tipoSeleccionado;

    // ✅ Debe cumplir todos los filtros a la vez
    return coincideTexto && coincideCategoria && coincideTipo;
  });
}




      goBack() {
        this.location.back();
      }
  irADetalle(item: any) {
    const id = item._id;

    if (item.tipo === 'Noticia') {
      this.router.navigate(['/noticia-despliegue', id]);
    } else if (item.tipo === 'Podcast') {
      this.router.navigate(['/podcast-despliegue', id]);
    } else if (item.tipo === 'Show') {
      this.router.navigate(['/radio-despliegue', id]);
    } else {
      console.warn('Tipo desconocido:', item);
    }
  }



getTipo(item: any): 'Noticia' | 'Podcast' | 'Show' | 'Desconocido' {
  if (item.meta?.image) return 'Noticia';
  if (item.embedUrl) return 'Podcast';
  if (item.image && !item.embedUrl && !item.meta) return 'Show';
  return 'Desconocido';
}

seleccionarCategoria(cat: string) {
  this.categoriaSeleccionada = cat;
}


seleccionarTipo(tipo: string) {
  this.tipoSeleccionado = tipo;
}

}
