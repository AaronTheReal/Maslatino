// nav-bar.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  imports:[CommonModule]
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
