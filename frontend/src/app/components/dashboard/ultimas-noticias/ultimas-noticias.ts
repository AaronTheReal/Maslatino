import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules'; // Importar módulos necesarios

// Registrar los módulos de Swiper
Swiper.use([Navigation, Pagination]);

@Component({
  selector: 'app-ultimas-noticias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ultimas-noticias.html',
  styleUrls: ['./ultimas-noticias.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UltimasNoticias implements AfterViewInit {
  categorias = ['Todo', 'Negocios', 'Deportes', 'Política', 'Entretenimiento'];
  selectedCat = 'Todo';

  ngAfterViewInit() {
    new Swiper('.ultimas-noticias-swiper', {
      slidesPerView: 1, // Mostrar un slide completo
      centeredSlides: true, // Centrar los slides
      spaceBetween: 24, // Espacio entre slides
      pagination: {
        el: '.swiper-pagination', // Elemento de paginación
        clickable: true, // Puntos clicables
      },
      navigation: {
        nextEl: '.swiper-button-next', // Botón siguiente (si se usa)
        prevEl: '.swiper-button-prev', // Botón anterior (si se usa)
      },
      loop: true, // Carrusel infinito (desactiva a false si hay problemas)
    });
  }
}