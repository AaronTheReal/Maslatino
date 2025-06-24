import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  standalone: true,
  imports: [IonicModule, CommonModule],
  selector: 'app-noticias', // o 'app-noticias' si lo prefieres consistente con el nombre de archivo
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent {
  @Input() newsList: Array<{ img: string; title: string; /* otros campos */ }> = [];

  constructor(private router: Router) {}

  onSelect(item: any) {

  }
        /** Navega a la lista completa de podcasts */
  viewAll() {
    this.router.navigate(['/noticias']);
  }
}
