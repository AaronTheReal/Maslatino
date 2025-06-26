import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-principales-noticias',
  templateUrl: './principales-noticias.html',
  styleUrl: './principales-noticias.css',
  standalone: true,
  imports:[CommonModule]

})
export class PrincipalesNoticias {
noticias = [
    {
      
      img: 'assets/PrincipalesNoticias/noticia1.jpg',
      categoria: 'Política',
      fecha: '24 de junio, 2025',
      titulo: 'Titular principal de la noticia grande'
    },
    {
      img: 'assets/PrincipalesNoticias/noticia2.png',
      categoria: 'Cultura',
      fecha: '23 de junio, 2025',
      titulo: 'Noticia secundaria 1'
    },
    {
      img: 'assets/PrincipalesNoticias/noticia3.jpg',
      categoria: 'Deportes',
      fecha: '22 de junio, 2025',
      titulo: 'Noticia secundaria 2'
    },
    {
      img: 'assets/PrincipalesNoticias/noticia4.jpg',
      categoria: 'Tecnología',
      fecha: '21 de junio, 2025',
      titulo: 'Noticia secundaria 3'
    }
  ];
}
