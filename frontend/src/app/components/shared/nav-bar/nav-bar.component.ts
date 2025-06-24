import { Component, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, CommonModule], // Añade CommonModule aquí
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  @Output() searchClicked = new EventEmitter<void>();

  onSearchClick() {
    // Emitir un evento para que el componente padre maneje la búsqueda
    this.searchClicked.emit();
  }
}