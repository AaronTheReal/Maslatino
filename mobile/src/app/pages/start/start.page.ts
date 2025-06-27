import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss']
})
export class StartPage {
  constructor(private router: Router) {}

async comenzar() {
  await Storage.set({ key: 'hasCompletedOnboarding', value: 'true' });
  this.router.navigate(['/select-language']);
}


}
