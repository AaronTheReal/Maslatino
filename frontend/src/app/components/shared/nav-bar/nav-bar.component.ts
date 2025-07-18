// nav-bar.component.ts
import { Component, Output, EventEmitter,ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  imports:[CommonModule,RouterModule],
  encapsulation: ViewEncapsulation.None  // 🔥 Desactiva el aislamiento CSS

})
export class NavBarComponent {
  @Output() searchClicked = new EventEmitter<void>();
  @Output() loginClicked = new EventEmitter<void>();

  onSearchClick() {
    this.searchClicked.emit();
  }
  onLoginClick() {
    this.loginClicked.emit();
  }
}
