import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { radioOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Location } from '@angular/common';
import { RadioData } from '../../../services/radio-service';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, TranslateModule],
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
})
export class RadioComponent implements OnInit {
  @Input() radioList: RadioData[] = [];
  @Output() selectRadio = new EventEmitter<RadioData>();

  constructor(
    private router: Router,
    public translate: TranslateService,
    private location: Location
  ) {
    addIcons({ 'radio-outline': radioOutline });
  }

  ngOnInit(): void {}

  onSelect(item: RadioData) {
    const lower = item.title?.toLowerCase() || '';

    if (lower.includes('vida')) {
      this.router.navigate(['/radio-vida']);
    } else if (lower.includes('latino')) {
      this.router.navigate(['/radio-despliegue']);
    } else {
      alert('Ruta no definida para esta radio');
    }
  }

  viewAll() {
    this.router.navigate(['/radio']);
  }

  goBack() {
    this.location.back();
  }
}
