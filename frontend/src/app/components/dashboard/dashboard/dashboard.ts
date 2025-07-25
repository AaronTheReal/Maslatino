import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PrincipalesNoticias } from '../principales-noticias/principales-noticias';
import { AnuncioPrincipal } from '../anuncio-principal/anuncio-principal';
import { EventosNoticias } from '../eventos-noticias/eventos-noticias';
import { Podcast } from '../podcast/podcast';
import { RecomendadasNoticias } from '../recomendadas-noticias/recomendadas-noticias';
import { UltimasNoticias } from '../ultimas-noticias/ultimas-noticias';
import { Unete } from '../unete/unete';
import { ContactUs } from '../contact-us/contact-us';
import '@mux/mux-player';

import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-dashboard',
  imports: [
    PrincipalesNoticias,
    AnuncioPrincipal,
    EventosNoticias,
    Podcast,
    RecomendadasNoticias,
    UltimasNoticias,
    CommonModule,
    Unete,
    ContactUs
    
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class Dashboard implements OnInit {

  constructor() { }

  ngOnInit(): void {
   
  }
}