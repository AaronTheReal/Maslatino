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
import { TranslateService } from '@ngx-translate/core'; // 👈 Agrega esto
import { RadioService, RadioData } from '../services/radio-service';
import { CategoriaService } from '../services/categorias-service';

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
    { img: 'assets/img/carousel1.jpg', title: '' },
    { img: 'assets/img/carousel2.jpg', title: '' },
    { img: 'assets/img/carousel3.jpeg', title: '' },
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

  radiosArray: RadioData[] = [];





  categoriesArray: CategoryItem[] = [];
  isLoginPage = false;
  activeTab: string = 'home';
  user: any;
  idUser:any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private podcastService: PodcastService,
    private translate: TranslateService,
    private radioService: RadioService,
    private categoriaService: CategoriaService

  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isLoginPage = event.url.includes('/login');
      });
  }

async ngOnInit(): Promise<void> {
this.authService.getUser().then(user => {
  this.idUser = user._id;
    this.user = user;

   console.log("usuarioo", this.user);


    if (user?.language) {
      this.translate.use(user.language);
      console.log('Idioma del usuario aplicado en Home:', user.language);
    }


});
        this.radioService.obtenerRadios().subscribe({
      next: (data) => {
        this.radiosArray = Array.isArray(data) ? data : [];
      },
      error: (err) => {
        console.error('Error al cargar radios:', err);
      }
    });


    this.noticiasArray = [
      { img: 'assets/imgNews/noticia1.png', title: 'Primera Noticia Importante', id: 1 },
      { img: 'assets/imgNews/noticia2.jpg', title: 'Segunda Noticia Relevante', id: 2 },
    ];

this.categoriaService.obtenerCategorias().subscribe({
  next: (categorias) => {
    // Asumiendo que name ya viene como string para traducir
    this.categoriesArray = categorias.map(cat => ({
      id: cat._id!,
      name: cat.name,
      color: cat.color,
      image: cat.image
    }));
  },
  error: (err) => {
    console.error('Error al cargar categorías dinámicas:', err);
  }
});

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
  this.translate.get(item.name).subscribe(translated => {
    const safeCategory = encodeURIComponent(translated);
    this.router.navigate(['/categorias-despliegue', safeCategory]);
  });
}

  onFooterTabChanged(tabName: string) {
    console.log('Footer seleccionó pestaña:', tabName);
    this.activeTab = tabName;
  }
}
