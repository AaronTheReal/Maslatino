import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBackOutline, searchOutline, alertCircleOutline } from 'ionicons/icons';
import { RadioService, RadioData } from '../../../services/radio-service';
import { TranslateModule, TranslateService } from '@ngx-translate/core'; // 👈 añadido

@Component({
  selector: 'app-radio-ind',
  standalone: true,
  templateUrl: './radio-ind.component.html',
  styleUrls: ['./radio-ind.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule,
          TranslateModule,

  ]
})
export class RadioIndComponent implements OnInit {
  radios: RadioData[] = [];
  filteredRadios: RadioData[] = [];
  searchTerm: string = '';
  isLoading = true;

  constructor(
    private radioService: RadioService,
    private router: Router
  ) {
    addIcons({
      'arrow-back-outline': arrowBackOutline,
      'search-outline': searchOutline,
      'alert-circle-outline': alertCircleOutline
    });
  }

  ngOnInit(): void {
    this.radioService.obtenerRadios().subscribe({
      next: (data) => {
        this.radios = Array.isArray(data) ? data : [];
        this.filteredRadios = this.radios.slice();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar radios:', err);
        this.radios = [];
        this.filteredRadios = [];
        this.isLoading = false;
      }
    });
  }

  filterRadios() {
    const term = this.searchTerm.trim().toLowerCase();
    this.filteredRadios = !term
      ? this.radios.slice()
      : this.radios.filter(radio =>
          radio.title.toLowerCase().includes(term)
        );
  }

  goToRadioDetail(title: string) {
    const lower = title.toLowerCase();
    if (lower.includes('vida')) {
      this.router.navigate(['/radio-vida']);
    } else if (lower.includes('latino')) {
      this.router.navigate(['/radio-despliegue']);
    } else {
      alert('Ruta no definida para esta radio');
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
