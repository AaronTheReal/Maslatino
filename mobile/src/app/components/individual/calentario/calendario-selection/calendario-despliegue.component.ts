import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

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
  IonButtons,
  IonListHeader,
  IonFooter,
  IonSkeletonText
} from '@ionic/angular/standalone';

import { FooterComponent } from '../../../../components/shared/footer/footer.component';
import { CarruselComponent } from '../../../../components/features/carrusel/carrusel.component';
import { TranslateModule } from '@ngx-translate/core';

import { addIcons } from 'ionicons';
import {
  calendarOutline,
  timeOutline,
  locationOutline,
  linkOutline,
  globeOutline,
  arrowBackOutline
} from 'ionicons/icons';

import { CalendarioService, CalendarItem } from '../../../../services/calendario-service';
import { SafePipe } from '../../../../pipes/safe.pipe';

@Component({
  selector: 'app-calendario-despliegue',
  standalone: true,
  templateUrl: './calendario-despliegue.component.html',
  styleUrls: ['./calendario-despliegue.component.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    CarruselComponent,
    IonAvatar,
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonButtons,
    IonListHeader,
    IonFooter,
    IonSkeletonText,
    FooterComponent,
    TranslateModule,
    SafePipe
  ],
})
export class CalentarioDespliegueComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private calendarioService = inject(CalendarioService);
  private location = inject(Location);

  loading = true;
  evento: {
    titulo: string;
    fecha: Date | null;
    horaInicio: string | null;
    horaFin: string | null;
    allDay: boolean;
    timezone: string | null;
    locacion: string | null;
    url: string | null;
    urlLabel: string | null;
    categorias: Array<{ name: string; slug: string; color?: string }> | null;
    tags: string[] | null;
    body: string | null;
    image: string | null;
  } | null = null;

  slidesArray: { img: string; title?: string }[] = [];

  constructor() {
    addIcons({
      'calendar-outline': calendarOutline,
      'time-outline': timeOutline,
      'location-outline': locationOutline,
      'link-outline': linkOutline,
      'globe-outline': globeOutline,
      'arrow-back-outline': arrowBackOutline
    });
  }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') || '';
    this.fetchEvento(slug);
  }

  private fetchEvento(slug: string) {
    this.loading = true;
    this.calendarioService.getBySlug(slug).subscribe({
      next: (res) => {
        const item = res.data as CalendarItem;
        this.evento = this.mapToViewModel(item);

        // Carrusel: usa imagen principal o placeholder
        const img = this.evento?.image || 'assets/img/carousel1.jpg';
        this.slidesArray = [{ img }];

        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando evento:', err);
        this.loading = false;
        this.evento = null;
      }
    });
  }

  private mapToViewModel(item: CalendarItem) {
    const start = item.startAt ? new Date(item.startAt) : null;
    const end = item.endAt ? new Date(item.endAt) : null;

    const formatTime = (d?: Date | null) =>
      d ? d.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }) : null;

    return {
      titulo: item.title,
      fecha: start,
      horaInicio: formatTime(start),
      horaFin: formatTime(end),
      allDay: !!item.allDay,
      timezone: item.timezone || null,
      locacion: item.location?.name || item.location?.address || null,
      url: item.link?.url || null,
      urlLabel: item.link?.label || null,
      categorias: (item as any).categories || null,
      tags: item.tags || null,
      body: item.body || null,
      image: item.image || null
    };
  }

  goBack() {
    this.location.back();
  }
}
