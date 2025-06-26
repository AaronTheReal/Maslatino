// src/app/components/individual/noticias-ind/noticias-ind.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  IonHeader, IonToolbar,
  IonButtons, IonBackButton,
  IonTitle, IonContent,
  IonCard
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

export interface Noticia {
  id: number;
  img: string;
  title: string;
  category?: string;
}

@Component({
  selector: 'app-noticias-ind',
  standalone: true,
  imports: [CommonModule,
    IonHeader, IonToolbar,
    IonButtons, IonBackButton,
    IonTitle, IonContent,
    IonCard],
  templateUrl: './noticias-ind.component.html',
  styleUrls: ['./noticias-ind.component.scss'],
})
export class NoticiasIndComponent implements OnInit {
  articles: Noticia[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    // Aquí podías llamar a un servicio, pero de momento:
    this.articles = [
      { id: 1, title: 'Gobernador visita la región', category: 'Política', img: 'assets/imgNews/noticia1.png' },
      { id: 2, title: 'La selección gana 3-0',          category: 'Deportes', img: 'assets/imgNews/noticia2.jpg' },
      { id: 3, title: 'Economía crece 2.5%',            category: 'Economía', img: 'assets/imgNews/noticia3.jpg' },
      // ... más noticias de prueba
    ];
  }

  onCardClick(id: number) {
    this.router.navigate(['/news', id]);
  }

}
