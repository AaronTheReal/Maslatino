// src/app/components/shared/footer/footer.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonFooter,
  IonToolbar,
  IonButton
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, IonFooter, IonToolbar, IonButton],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  @Input() activeTab: string = 'home';
  @Output() tabChange = new EventEmitter<string>();

  tabs = [
    { name: 'home' },
    { name: 'announcements' },
    { name: 'play' },
    { name: 'calendar' },
    { name: 'profile' }
  ];

  constructor(private router: Router) {}

  onSelect(tabName: string) {
    this.activeTab = tabName;
    this.tabChange.emit(tabName);

    // Mapa de rutas según nombre
    const ruta = {
      home: '/home',
      announcements: '/announcements',
      play: '/reproductor',
      calendar: '/calentario',
      profile: '/profile'

    }[tabName];

    if (ruta) {
      this.router.navigate([ruta]);
    }
  }
}
