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
    this.selectRadio.emit(item);
  }

  viewAll() {
    this.router.navigate(['/radio']);
  }

  goBack() {
    this.location.back();
  }
}
