import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
  imports:[CommonModule,IonicModule]

})
export class AdminPanelComponent  implements OnInit {

  constructor() { }
  sampleAdminCategories: Array<{ name: string; color: string; }> = [];

  ngOnInit() {
    this.sampleAdminCategories = [
      { name: 'Noticias',   color: '#0d6efd' },
      { name: 'Podcasts',   color: '#9b59b6' },
      { name: 'Calendario', color: '#e74c3c' },
      { name: 'Categorias', color: '#f39c12' },
      { name: 'Radio',      color: '#2ecc71' },
      { name: 'Usuarios',   color: '#6610f2' },
    ];
  }

}


