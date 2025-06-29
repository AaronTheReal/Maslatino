import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PodcastService } from '../services/spotify-podcasts';
import { CarruselComponent } from '../components/features/carrusel/carrusel.component';
import { NavbarComponent } from '../components/shared/navbar/navbar.component';
import { NoticiasComponent } from '../components/features/noticias/noticias.component';
import { PodcastsComponent } from '../components/features/podcasts/podcasts.component';
import { RadioComponent } from '../components/features/radio/radio.component';
import { CategoriesComponent, CategoryItem } from '../components/features/categorias/categorias.component';
import { FooterComponent } from '../components/shared/footer/footer.component';
import { AuthService } from '../services/auth-service';

@Component({
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    HttpClientModule,
    NavbarComponent,
    CarruselComponent,
    NoticiasComponent,
    PodcastsComponent,
    RadioComponent,
    CategoriesComponent,
    FooterComponent,
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
  podcastsArray: Array<{
    _id?: string;
    spotifyId: string;
    title: string;
    description?: string;
    image?: string;
    url?: string;
    embedUrl?: string;
  }> = [];
  
radiosArray: Array<{
  _id?: string;
  spotifyId: string;
  title: string;
  image?: string;
  description?: string;
  url?: string;
  embedUrl?: string;
}> = [];


  
  categoriesArray: CategoryItem[] = [];
  isLoginPage = false;
  activeTab: string = 'home';
  user: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private podcastService: PodcastService
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isLoginPage = event.url.includes('/login');
      });
  }

  async ngOnInit(): Promise<void> {
    this.authService.getUser().then(user => {
      this.user = user;
      console.log('usuario', this.user);
    });

    this.podcastService.getPodcasts().subscribe(
      (data) => {
        this.podcastsArray = data;
      },
      (error) => {
        console.error('Error loading podcasts', error);
      }
    );

    this.noticiasArray = [
      { img: 'assets/imgNews/noticia1.png', title: 'Primera Noticia Importante', id: 1 },
      { img: 'assets/imgNews/noticia2.jpg', title: 'Segunda Noticia Relevante', id: 2 },
    ];

 
    this.categoriesArray = [
      { id: 1, name: 'Arte' },
      { id: 2, name: 'Deportes' },
      { id: 3, name: 'Educación' },
      { id: 4, name: 'Tecnología' },
      { id: 5, name: 'Música' },
      { id: 6, name: 'Cocina' },
    ];
  }

  onNoticiaSeleccionada(item: any) {
    console.log('HomePage navega a detalle de:', item);
  }

  onPodcastSeleccionado(item: any) {
    console.log('HomePage reproduce podcast (via iframe):', item);
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
  }
}
