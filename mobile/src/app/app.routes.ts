// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'announcements',
    loadComponent: () =>
      import('./components/individual/noticias-ind/noticias-ind.component').then(
        (m) => m.NoticiasIndComponent
      ),
  },
    {
    path: 'categorias',
    loadComponent: () =>
      import('./components/individual/categorias-ind/categorias-ind.component').then((m) => m.CategoriasIndComponent),
  },
    {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'podcasts',
    loadComponent: () =>
      import('./components/individual/podcasts-ind/podcasts-ind.component').then((m) => m.PodcastsIndComponent),

  },{
    path: 'radio',
    loadComponent: () =>
      import('./components/individual/radio-ind/radio-ind.component').then((m) => m.RadioIndComponent),

  },

{
    path: 'noticias',
    loadComponent: () =>
      import('./components/individual/noticias-ind/noticias-ind.component').then((m) => m.NoticiasIndComponent),

  },
  {
    path: 'noticia-despliegue/:id',
    loadComponent: () =>
      import('./components/despliegue-futuro/noticia-despliegue/noticia-despliegue.component').then((m) => m.NoticiaDespliegueComponent),

  },
   {
    path: 'radio-despliegue/:id',
    loadComponent: () =>
      import('./components/despliegue-futuro/radio-despliegue/radio-despliegue.component').then((m) => m.RadioDespliegueComponent),

  },
   {
    path: 'podcast-despliegue/:id',
    loadComponent: () =>
      import('./components/despliegue-futuro/podcast-despliegue/podcast-despliegue.component').then((m) => m.PodcastDespliegueComponent),

  },
{
    path: 'play',
    loadComponent: () =>
      import('./components/individual/play-ind/play-ind.component').then((m) => m.PlayIndComponent),

  },
{
    path: 'profile',
    loadComponent: () =>
      import('./components/individual/profile/profile.component').then((m) => m.ProfileComponent),

  },{
    path: 'admin-panel',
    loadComponent: () =>
      import('./components/admin/admin-panel/admin-panel.component').then((m) => m.AdminPanelComponent),

  },

  /*

  {
    path: 'calendar',
    loadComponent: () =>
      import('./calendar/calendar.page').then(
        (m) => m.CalendarPage
      ),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./add/add.page').then((m) => m.AddPage),
  },
  */

];
