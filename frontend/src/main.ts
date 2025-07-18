// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

import 'swiper/element/bundle';
import { register } from 'swiper/element/bundle';
register(); // 👈 REGISTRA el custom element

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
