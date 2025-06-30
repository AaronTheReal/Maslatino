// src/app/components/features/categories/categories.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

export interface CategoryItem {
  name: string;
  color?: string;
  id?: any;
}

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [IonicModule, CommonModule,TranslateModule],
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})
export class CategoriesComponent implements OnInit {
  @Input() categoriesList: CategoryItem[] = [];
  @Output() selectCategory = new EventEmitter<CategoryItem>();

  private palette: string[] = [
    '#1abc9c', '#8e44ad', '#e67e22',
    '#3498db', '#e74c3c', '#f1c40f',
    '#2ecc71', '#9b59b6', '#e84393',
    '#d35400',
  ];
  categoryColors: string[] = [];

  constructor(private router: Router,public translate: TranslateService) {}

  ngOnInit(): void {
    this.categoryColors = this.categoriesList.map((item, idx) =>
      item.color?.trim() ? item.color : this.palette[idx % this.palette.length]
    );
  }

  /** Para cada tarjeta */
  getColor(idx: number): string {
    return this.categoryColors[idx];
  }

  onSelect(item: CategoryItem, idx: number) {
    this.selectCategory.emit(item);
    // Si en el futuro quieres navegar a un detalle:
    // this.router.navigate(['/categorias', item.id]);
  }

  /** Botón “Ver todo” */
  viewAll() {
    this.router.navigate(['/categorias']);
  }
}
