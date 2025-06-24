// src/app/components/features/podcasts/podcasts.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
;
interface RadioItem {
  id?: any;
  title: string;
  img?: string;         // opcional: si no hay imagen, mostramos icono
  description?: string; // opcional: podrías usarla en un tooltip o detalle
  // otros campos que necesites, ej. streamUrl?: string
}

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule],
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
})
export class RadioComponent {
  /** Lista de estaciones de radio */
  @Input() radioList: RadioItem[] = [];
  @Output() selectRadio = new EventEmitter<RadioItem>();

  constructor(private router: Router) {}

  onSelect(item: RadioItem) {
    this.selectRadio.emit(item);
  }
    /** Navega a la lista completa de podcasts */
  viewAll() {
    this.router.navigate(['/radio']);
  }
}



