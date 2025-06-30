import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-categorias-ind',
  templateUrl: './categorias-ind.component.html',
  styleUrls: ['./categorias-ind.component.scss'],
  imports:[CommonModule,IonicModule,TranslateModule]
})
export class CategoriasIndComponent  implements OnInit {

  constructor(public translate: TranslateService) { }

  sampleCategories: Array<{ name: string; color: string; }> = [];

  ngOnInit() {

    this.sampleCategories = [
  { name: 'CATEGORY.ART',          color: '#1abc9c' },
  { name: 'CATEGORY.SPORTS',      color: '#9b59b6' },
  { name: 'CATEGORY.WORLD',     color: '#e74c3c' },
  { name: 'CATEGORY.POLITICIAN', color: '#f39c12' },
  { name: 'CATEGORY.Finanzas',       color: '#2ecc71' },
  { name: 'CATEGORY.HEALTH',      color: '#34495e' },
  { name: 'CATEGORY.FAMILY',    color: '#e67e22' },
//{ name: 'CATEGORY.HEALTH',         color: '#d35400' },
];
     
  }

}