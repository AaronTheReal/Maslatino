import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CategoriaService } from '../../../services/categorias-service';

export interface CategoryItem {
  id: string;
  name: string;
  color?: string;
  image?: string;
}

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [IonicModule, CommonModule, TranslateModule],
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})
export class CategoriesComponent implements OnChanges {
  @Input() categoriesList: CategoryItem[] = [];
  @Output() selectCategory = new EventEmitter<CategoryItem>();

  private palette: string[] = [
    '#1abc9c', '#8e44ad', '#e67e22',
    '#3498db', '#e74c3c', '#f1c40f',
    '#2ecc71', '#9b59b6', '#e84393',
    '#d35400',
  ];
  categoryColors: string[] = [];

  constructor(private router: Router, public translate: TranslateService, private categoriaService: CategoriaService) {}

  // ✅ Este método era lo que te faltaba
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoriesList'] && this.categoriesList?.length > 0) {
      this.categoryColors = this.categoriesList.map((item, idx) =>
        item.color?.trim() ? item.color : this.palette[idx % this.palette.length]
      );
    }
  }

  getColor(idx: number): string {
    return this.categoryColors[idx];
  }

  onSelect(item: CategoryItem, idx: number) {
    this.selectCategory.emit(item);
  }

  viewAll() {
    this.router.navigate(['/categorias']);
  }
}
