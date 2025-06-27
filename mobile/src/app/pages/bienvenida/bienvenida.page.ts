import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule]
})
export class BienvenidaPage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {}

  onVideoEnded() {
    this.router.navigate(['/home']);
  }
}
