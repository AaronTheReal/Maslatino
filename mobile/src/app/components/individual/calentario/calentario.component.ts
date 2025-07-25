import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common'; // ✅ ESTA es la correcta
import { FooterComponent } from '../../../components/shared/footer/footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core'; // 👈 añadido
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonAvatar,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonButtons,       // Añadido para <ion-buttons>
  IonListHeader,    // Añadido para <ion-list-header>
  IonFooter         // Añadido para <ion-footer>
} from '@ionic/angular/standalone';
import { CalendarioService } from '../../../services/calendario-service';


@Component({
  selector: 'app-calentario',
  templateUrl: './calentario.component.html',
  styleUrls: ['./calentario.component.scss'],
    imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonAvatar,
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonButtons,       // Añadido
    IonListHeader,    // Añadido
    IonFooter,        // Añadido
    FooterComponent,
    TranslateModule,

  ],

})

export class CalentarioComponent implements OnInit {
  eventosAgrupadosPorDia: {
    dia: string;
    mes: string;
    eventos: {
      imagenUrl: string;
      hora: string;
      descripcion: string;
      slug: string;
    }[];
  }[] = [];

  constructor(
    private location: Location,
    private router: Router,
    private calendarioService: CalendarioService
  ) {}

  ngOnInit(): void {
    this.cargarEventos();
  }

  cargarEventos(): void {
    this.calendarioService
      .list({
        status: 'published',
        sort: 'startAt:asc',
        limit: 100
      })
      .subscribe({
        next: (res) => {
          const eventos = res.data;
    
          const agrupados: Record<string, any[]> = {};

          for (const evento of eventos) {
            const fecha = new Date(evento.startAt);
            const key = fecha.toISOString().split('T')[0]; // YYYY-MM-DD

            if (!agrupados[key]) agrupados[key] = [];

            agrupados[key].push({
              imagenUrl: evento.image || 'assets/eventos/default.jpg',
              hora: fecha.toLocaleTimeString('es-MX', {
                hour: '2-digit',
                minute: '2-digit',
              }),
              descripcion: evento.title,
              slug: evento.slug
            });
          }

          // Convertir a array ordenado por fecha
          this.eventosAgrupadosPorDia = Object.entries(agrupados)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map(([fechaStr, eventos]) => {
              const fecha = new Date(fechaStr);
              const dia = fecha.getDate().toString().padStart(2, '0');
              const mes = fecha.toLocaleString('es-MX', { month: 'short' });
              return { dia, mes, eventos };
            });
        },
        error: (err) => {
          console.error('Error al cargar eventos del calendario:', err);
        },
      });
  }

  irADetalleEvento(evento: any) {
    this.router.navigate(['/calendarioDespliegue', evento.slug]);
  }

  goBack() {
    this.location.back();
  }
}
