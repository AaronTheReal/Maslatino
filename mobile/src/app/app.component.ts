import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import {NavbarComponent} from './components/shared/navbar/navbar.component';
import {

  IonButtons,
  IonButton,
  IonIcon,
  IonFooter
} from '@ionic/angular/standalone';
import { register } from 'swiper/element/bundle';
import { CommonModule } from '@angular/common'; // <-- importa CommonModule
import { FooterComponent } from './components/shared/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [HttpClientModule,IonApp, IonRouterOutlet,IonHeader,IonFooter, IonButtons, IonIcon, IonToolbar, IonTitle, IonContent,NavbarComponent,FooterComponent,CommonModule],
  
})
export class AppComponent {
    activeTab: string = 'home';

  constructor() {}
  onFooterTabChanged(tabName: string) {
  console.log('Footer seleccionó pestaña:', tabName);
  this.activeTab = tabName;
  // Aquí decide si navegas a otra página o cambias secciones en esta vista.
}

}

