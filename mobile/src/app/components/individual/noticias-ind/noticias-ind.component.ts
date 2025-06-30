import { Component, OnInit } from '@angular/core';
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
import { arrowBackOutline, searchOutline, alertCircleOutline } from 'ionicons/icons';


@Component({
  selector: 'app-noticias-ind',
  standalone: true,
  templateUrl: './noticias-ind.component.html',
  styleUrls: ['./noticias-ind.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonIcon,
    IonButtons,
    TranslateModule
  ]
})
export class NoticiasIndComponent implements OnInit {
  searchTerm = '';
  articles: Noticia[] = [];
  filtered: Noticia[] = [];
isFavorite = false;

  constructor(private noticiasService: NoticiasService, private router: Router,public translate: TranslateService
) {

   addIcons({
  'arrow-back-outline': arrowBackOutline,
  'search-outline': searchOutline,
  'alert-circle-outline': alertCircleOutline
});
}

  ngOnInit(): void {
    this.noticiasService.getNoticias().subscribe({
      next: (data: Noticia[]) => {
        this.articles = data;
        this.filtered = data;
      },
      error: (err) => console.error('Error al cargar noticias', err)
    });
  }

  filter(): void {
    const term = this.normalize(this.searchTerm.trim().toLowerCase());
    if (!term) {
      this.filtered = this.articles;
      return;
    }

    const words = term.split(/\s+/);
    this.filtered = this.articles.filter(n =>
      words.every(word => this.normalize(n.title.toLowerCase()).includes(word))
    );
  }

  normalize(text: string): string {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  onCardClick(id?: string): void {
    if (id) this.router.navigate(['/noticia-despliegue', id]);
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
  
}
