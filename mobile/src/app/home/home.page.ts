// src/app/home/home.page.ts
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { CarruselComponent } from '../components/features/carrusel/carrusel.component';
import { NavbarComponent } from '../components/shared/navbar/navbar.component';
import { NoticiasComponent } from '../components/features/noticias/noticias.component';
import { PodcastsComponent } from '../components/features/podcasts/podcasts.component';
import { InicioComponent } from '../../app/components/features/inicio/inicio.component';
import { AuthService } from '../services/auth-service';
import { RadioComponent } from '../components/features/radio/radio.component';
import { CategoriesComponent, CategoryItem } from '../components/features/categorias/categorias.component';
import { FooterComponent } from '../components/shared/footer/footer.component';
import { CommonModule } from '@angular/common'; // <-- importa CommonModule
import { HttpClientModule } from '@angular/common/http';
import { Router,NavigationEnd } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';



@Component({
  standalone: true,
  imports: [
    IonicModule,
    NavbarComponent,
    CarruselComponent,
    NoticiasComponent,
    PodcastsComponent,
    RadioComponent,
    CategoriesComponent,
    FooterComponent,
    CommonModule,
    HttpClientModule,
    InicioComponent
  ],
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  slidesArray = [
    { img: 'assets/img/carousel1.jpg', title: 'Noticias de Interés' },
    { img: 'assets/img/carousel2.jpg', title: 'Eventos Especiales' },
    { img: 'assets/img/carousel3.jpg', title: 'Entrevistas Exclusivas' },
  ];

  noticiasArray: Array<{ img: string; title: string; id?: any }> = [];
  podcastsArray: Array<{ id: any; title: string; img?: string; description?: string }> = [];
  radiosArray: Array<{ id?: any; title: string; img?: string; description?: string }> = [];
  categoriesArray: CategoryItem[] = [];
  isLoginPage = false;

  /** Pestaña activa en el footer */
  activeTab: string = 'home';
  user: any;
  constructor(private router: Router, private authService : AuthService) {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isLoginPage = event.url.includes('/login');
      });
  
  }

  ngOnInit(): void {
  this.authService.getUser().then(user => {
    this.user = user;
    console.log("usuario", this.user);
  });
    /*
     const user = localStorage.getItem('user');
  if (!user) {
    this.router.navigate(['/login']);
  }
    */
    this.noticiasArray = [
      { img: 'assets/imgNews/noticia1.png', title: 'Primera Noticia Importante', id: 1 },
      { img: 'assets/imgNews/noticia2.jpg', title: 'Segunda Noticia Relevante', id: 2 },
      // ...
    ];
    this.radiosArray = [
      { img: 'assets/imgNews/noticia1.png', title: 'Primera Estación', id: 1 },
      { img: 'assets/imgNews/noticia2.jpg', title: 'Segunda Estación', id: 2 },
      // ...
    ];
    this.categoriesArray = [
      { id: 1, name: 'Arte' },
      { id: 2, name: 'Deportes' },
      { id: 3, name: 'Educación' },
      { id: 4, name: 'Tecnología' },
      { id: 5, name: 'Música' },
      { id: 6, name: 'Cocina' },
      // ... más categorías
    ];
    // podcastsArray similar...
  }

  onNoticiaSeleccionada(item: any) {
    console.log('HomePage navega a detalle de:', item);
    // this.router.navigate(['/detalle-noticia', item.id]);
  }
  onPodcastSeleccionado(item: any) {
    console.log('HomePage reproduce podcast:', item);
  }
  onRadioSeleccionada(item: any) {
    console.log('HomePage selecciona radio:', item);
  }
  onCategoriaSeleccionada(item: CategoryItem) {
    console.log('HomePage: categoría seleccionada:', item);
  }
onFooterTabChanged(tabName: string) {
  console.log('Footer seleccionó pestaña:', tabName);
  this.activeTab = tabName;
  // Aquí decide si navegas a otra página o cambias secciones en esta vista.
}


}
