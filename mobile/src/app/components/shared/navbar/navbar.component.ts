import { Component, Input } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core'; // 👈

import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonTitle,
    TranslateModule // 👈 importante
  ],
})
export class NavbarComponent {
  @Input() username: string = '';

  constructor(public translate: TranslateService) {}
  
}
