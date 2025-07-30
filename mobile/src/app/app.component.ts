import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { IonButtons, IonButton, IonIcon, IonFooter } from '@ionic/angular/standalone';
import { register } from 'swiper/element/bundle';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Preferences } from '@capacitor/preferences';
import { TranslateService } from '@ngx-translate/core';
import { AppGlobalPlayerComponent } from './components/app-global-player/app-global-player.component';
import { App as CapacitorApp } from '@capacitor/app'; // IMPORTANTE

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    HttpClientModule,
    IonApp,
    IonRouterOutlet,
    IonHeader,
    IonFooter,
    IonButtons,
    IonIcon,
    IonToolbar,
    IonTitle,
    IonContent,
    NavbarComponent,
    FooterComponent,
    CommonModule,
    AppGlobalPlayerComponent
  ],
})
export class AppComponent {
  activeTab: string = 'home';
  isLoginPage = false;

  constructor(
    private router: Router,
    private translate: TranslateService
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isLoginPage = event.url.includes('/login');
      });

    this.initializeApp();
  }

  async initializeApp() {
    const { value: selectedLanguage } = await Preferences.get({ key: 'selectedLanguage' });
    const userLang = selectedLanguage || 'es';
    this.translate.setDefaultLang('es');
    this.translate.use(userLang);

    await this.checkOnboardingStatus();

    const isLoggedIn = await Preferences.get({ key: 'token' });

    if (isLoggedIn?.value) {
      this.router.navigate(['/home']);
    }

    // 👇 LÓGICA PARA ENLACES EXTERNOS (deep links)
    CapacitorApp.addListener('appUrlOpen', (event: any) => {
      try {
        const url = new URL(event.url);
        const path = url.pathname; // ej. /link/podcast/123/episodio/456

        if (path.startsWith('/link/podcast/')) {
          const segments = path.split('/');

          // Esperamos: /link/podcast/:podcastId/episodio/:episodioId
          const podcastId = segments[3];
          const episodioId = segments[5];

          if (podcastId && episodioId) {
            this.router.navigate([`/podcast-despliegue/${podcastId}`], {
              queryParams: { episodio: episodioId }
            });
          }
        }
      } catch (error) {
        console.error('Error al procesar deep link:', error);
      }
    });
  }

  async checkOnboardingStatus() {
    const { value: hasCompletedOnboarding } = await Preferences.get({ key: 'hasCompletedOnboarding' });
    const { value: selectedLanguage } = await Preferences.get({ key: 'selectedLanguage' });

    if (!hasCompletedOnboarding) {
      this.router.navigate(['/start']);
    } else if (!selectedLanguage) {
      this.router.navigate(['/select-language']);
    }
  }

  onFooterTabChanged(tabName: string) {
    this.activeTab = tabName;
  }
}
