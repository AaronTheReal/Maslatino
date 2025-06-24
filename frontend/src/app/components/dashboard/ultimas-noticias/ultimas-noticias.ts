import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ultimas-noticias',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './ultimas-noticias.html',
  styleUrls: ['./ultimas-noticias.css']
})
export class UltimasNoticias {
  categorias = ['Todo', 'Negocios', 'Deportes', 'Política', 'Entretenimiento'];
  selectedCat = 'Todo';

  noticias = [
    {
      tipo: 'Locales',
      fecha: 'mayo 15, 2025',
      titulo: 'Worcester – ICE Desata Protestas, El Ayuntamiento Se Reúne En Zoom.',
      resumen: 'Worcester traslada reuniones del Consejo a Zoom tras protestas por arresto de ICE y enfrentamiento entre vecinos y...',
      img: 'assets/UltimasNoticias/noticia1.jpeg',
      size: 'large'
    },
    {
      tipo: 'Entretenimiento, Familia, Noticias Locales',
      fecha: 'junio 10, 2025',
      titulo: 'Washington Se Prepara Para Celebrar Este 14 De Junio',
      resumen: 'El 14 de junio se celebra el aniversario del Ejército y el cumpleaños de Trump, en un evento...',
      img: 'assets/UltimasNoticias/noticia2.jpg',
      size: 'large'
    },
    {
      tipo: 'Mundo',
      fecha: 'junio 23, 2025',
      titulo: 'Vuelos afectados por crisis en Oriente Medio',
      resumen: 'La escalada militar en Oriente Medio provoca cancelaciones y desvíos de vuelos en rutas clave entre Europa, Asia y el...',
      img: 'assets/UltimasNoticias/noticia3.png',
      size: 'small'
    },
    {
      tipo: 'Política, Salud',
      fecha: 'junio 11, 2025',
      titulo: 'Vacunas: Expertos critican a RFK Jr. por despedir asesores',
      resumen: 'Vacunas: exdirector del CDC critica a RFK Jr. por despedir al comité asesor, generando preocupación entre expertos en salud.',
      img: 'assets/UltimasNoticias/noticia4.jpg',
      size: 'small'
    },
    {
      tipo: 'Política',
      fecha: 'febrero 21, 2025',
      titulo: 'Una encuesta midió el impacto en la imagen de Javier Milei y arrojó un sorpresivo',
      resumen: 'Prueba Test',
      img: 'assets/UltimasNoticias/noticia5.jpg',
      size: 'small'
    },
    {
      tipo: 'Mundo',
      fecha: 'marzo 10, 2025',
      titulo: 'Una bomba sin explotar de la Segunda Guerra Mundial interrumpe en París',
      resumen: 'Una bomba de la Segunda Guerra Mundial hallada cerca de la Gare du Nord en París causó caos, afectando a...',
      img: 'assets/UltimasNoticias/noticia6.jpg',
      size: 'small'
    }
  ];
}












