// src/app/routes.server.ts
import { ServerRoute, RenderMode } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '', // Home
    renderMode: RenderMode.Prerender
  },
  {
    path: 'sobre-nosotros', // nuestra ruta pública
    renderMode: RenderMode.Prerender
  },
  {
    path: 'admin-panel', // nuestra ruta pública
    renderMode: RenderMode.Prerender
  },
  {
    path: 'usuarios-panel', // nuestra ruta pública
    renderMode: RenderMode.Prerender
  },
  {
    path: 'calendario-panel', // nuestra ruta pública
    renderMode: RenderMode.Prerender
  },
  {
    path: 'multimedia-panel', // nuestra ruta pública
    renderMode: RenderMode.Prerender
  },
    {
    path: 'noticias-panel', // nuestra ruta pública
    renderMode: RenderMode.Prerender
  },
    {
    path: 'multimedia-panel', // nuestra ruta pública
    renderMode: RenderMode.Prerender
  },
    {
    path: 'podcast-panel', // nuestra ruta pública
    renderMode: RenderMode.Prerender
  },
    {
    path: 'radio-panel', // nuestra ruta pública
    renderMode: RenderMode.Prerender
  },
    {
    path: 'categorias-panel', // nuestra ruta pública
    renderMode: RenderMode.Prerender
  },
  {
    path: 'sobre-nosotros', // nuestra ruta pública
    renderMode: RenderMode.Prerender
  },
  {
    path: 'noticia/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { slug: 'google-y-microsoft-trabajan-juntas-en-el-framework-de-javascript-angular-2' }
        // agrega otros slugs si lo deseas
      ];
    }
  }
];



/*
// src/app/routes.server.ts
import { ServerRoute, RenderMode } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '', // Home
    renderMode: RenderMode.Prerender
  },
  {
    path: 'sobre-nosotros', // nuestra ruta pública
    renderMode: RenderMode.Prerender
  },
  {
    path: 'admin-panel', // nuestra ruta pública
    renderMode: RenderMode.Prerender
  },
  {
    path: 'usuarios-panel', // nuestra ruta pública
    renderMode: RenderMode.Prerender
  },
  {
    path: 'calendario-panel', // nuestra ruta pública
    renderMode: RenderMode.Prerender
  },
  {
    path: 'multimedia-panel', // nuestra ruta pública
    renderMode: RenderMode.Prerender
  },
    {
    path: 'noticias-panel', // nuestra ruta pública
    renderMode: RenderMode.Prerender
  },
    {
    path: 'multimedia-panel', // nuestra ruta pública
    renderMode: RenderMode.Prerender
  },
    {
    path: 'podcast-panel', // nuestra ruta pública
    renderMode: RenderMode.Prerender
  },
    {
    path: 'radio-panel', // nuestra ruta pública
    renderMode: RenderMode.Prerender
  },
    {
    path: 'categorias-panel', // nuestra ruta pública
    renderMode: RenderMode.Prerender
  },
  {
    path: 'sobre-nosotros', // nuestra ruta pública
    renderMode: RenderMode.Prerender
  },
  {
    path: 'noticia/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { slug: 'google-y-microsoft-trabajan-juntas-en-el-framework-de-javascript-angular-2' }
        // agrega otros slugs si lo deseas
      ];
    }
  }
];


*/