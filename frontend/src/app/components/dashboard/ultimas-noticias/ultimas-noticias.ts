import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules'; // Importar módulos necesarios
import { CalendarPCService, CalendarItemPC } from '../../../services/calendario-servicePC';
import {
  CategoriaService,
  CategoriaPayload,
} from '../../../services/categorias-service';


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
  categorias: CategoriaPayload[] = [];
  selectedCat = 'Todo';
  items: CalendarItemPC[] = [];

  loadingList = false;

  constructor( private calendarService: CalendarPCService,private categoriaService: CategoriaService) {}

   ngOnInit(): void {
    this.loadCategorias();
    this.loadItems();

   }
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
  loadCategorias() {
    this.categoriaService.obtenerCategorias().subscribe({
      next: (res) => (this.categorias = res),
      error: () => alert('Error al cargar categorías'),
    });
  }
   loadItems(): void {
    this.loadingList = true;
    this.calendarService.obtenerItems().subscribe(data => {
      this.items = data;
      this.loadingList = false;
      console.log("items",this.items);
    });
  }


}