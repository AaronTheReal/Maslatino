import {
  Component,
  Input,
  AfterViewInit,
  ViewEncapsulation,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-carrusel',
  standalone: true,
  imports: [CommonModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None, // permite estilos hacia shadow DOM de web components de Swiper
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.scss'],
})
export class CarruselComponent implements AfterViewInit {
  /** Slides a mostrar: array de objetos con al menos img y opcional title o link */
  @Input() slides: Array<{ img: string; title?: string; link?: string }> = [];

  /** Tiempo de autoplay en ms; puede ser @Input también */
  @Input() autoplayDelay = 3000;

  constructor() {}

  ngAfterViewInit() {
    // Asegurarse que el web component de Swiper se inicialice. 
    // Si usas register() en AppComponent, normalmente ya está disponible.
    // Si falla, este timeout fuerza inicialización.
    setTimeout(() => {
      const el = document.querySelector('swiper-container');
      if (el && typeof (el as any).initialize === 'function') {
        (el as any).initialize();
      }
    }, 0);
  }
}
