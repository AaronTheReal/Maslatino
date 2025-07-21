import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { radioOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; // ✅ ESTA es la correcta

@Component({
  selector: 'app-radio-vida',
  templateUrl: './radio-vida.component.html',
  styleUrls: ['./radio-vida.component.scss'],
  imports: [CommonModule, IonicModule],
    standalone: true,

})
export class RadioVidaComponent  {

    
  constructor(

      private router: Router,
      private location: Location
  ) { }

      goBack() {
        this.location.back();
      }
}
