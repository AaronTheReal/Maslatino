// src/main.server.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { App } from './app/app';
import { config } from './app/app.config.server';
import { serverRoutes } from './routes.server';

const bootstrap = () =>
  bootstrapApplication(App, {
    ...config,
    providers: [
      ...config.providers,
      provideServerRendering(withRoutes(serverRoutes))
    ]
  });

export default bootstrap;
