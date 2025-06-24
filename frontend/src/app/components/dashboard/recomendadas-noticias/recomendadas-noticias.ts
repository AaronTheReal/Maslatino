import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recomendadas-noticias',
  standalone: true,
  templateUrl: './recomendadas-noticias.html',
  styleUrls: ['./recomendadas-noticias.css'],
  imports:[CommonModule]
})
export class RecomendadasNoticias {
  recomendaciones = [
    {
      img: 'assets/RecomendadasNoticias/noticia1.jpg',
      categoria: 'Economía',
      fecha: '20 de junio, 2025',
      titulo: 'Cómo impacta la inflación en tu bolsillo'
    },
    {
      img: 'assets/RecomendadasNoticias/noticia2.jpg',
      categoria: 'Salud',
      fecha: '19 de junio, 2025',
      titulo: '5 hábitos para dormir mejor cada noche'
    },
    {
      img: 'assets/RecomendadasNoticias/noticia3.jpg',
      categoria: 'Viajes',
      fecha: '18 de junio, 2025',
      titulo: 'Los 10 destinos emergentes en 2025'
    },
    {
      img: 'assets/RecomendadasNoticias/noticia4.jpg',
      categoria: 'Ciencia',
      fecha: '17 de junio, 2025',
      titulo: 'El avance de la IA en la medicina moderna'
    }
  ];
}
