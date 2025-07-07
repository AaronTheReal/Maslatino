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

export class CalentarioComponent  implements OnInit {

  constructor(
       private location: Location,
       private router: Router


  ) { }

  ngOnInit() {}
eventosAgrupadosPorDia = [
  {
    dia: '04',
    mes: 'Jul',
    eventos: [
      {
        imagenUrl: 'assets/eventos/evento1.jpg',
        hora: '10:00 AM',
        descripcion: 'Reunión con el equipo de diseño'
      },
      {
        imagenUrl: 'assets/eventos/evento2.jpg',
        hora: '1:00 PM',
        descripcion: 'Lanzamiento de nueva campaña'
      }
    ]
  },
  {
    dia: '05',
    mes: 'Jul',
    eventos: [
      {
        imagenUrl: 'assets/eventos/evento3.jpg',
        hora: '9:00 AM',
        descripcion: 'Desayuno con cliente'
      }
    ]
  }
];
irADetalleEvento(evento: any) {
  // Si quieres pasar data por query params o ID, ajusta aquí
  this.router.navigate(['/calendarioDespliegue']);
}

    goBack() {
        this.location.back();
      }

}
