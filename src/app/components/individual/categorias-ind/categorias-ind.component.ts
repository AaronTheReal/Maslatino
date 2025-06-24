import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-categorias-ind',
  templateUrl: './categorias-ind.component.html',
  styleUrls: ['./categorias-ind.component.scss'],
  imports:[CommonModule,IonicModule]
})
export class CategoriasIndComponent  implements OnInit {

  constructor() { }

  sampleCategories: Array<{ name: string; color: string; }> = [];

  ngOnInit() {

    this.sampleCategories = [
  { name: 'Arte',          color: '#1abc9c' },
  { name: 'Deportes',      color: '#9b59b6' },
  { name: 'Educación',     color: '#e74c3c' },
  { name: 'Entretenimiento', color: '#f39c12' },
  { name: 'Familia',       color: '#2ecc71' },
  { name: 'Finanzas',      color: '#34495e' },
  { name: 'Tecnología',    color: '#e67e22' },
  { name: 'Salud',         color: '#d35400' },
];

  }

}
