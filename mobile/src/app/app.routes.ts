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
    path: 'calentario',
    loadComponent: () =>
      import('./components/individual/calentario/calentario.component').then((m) => m.CalentarioComponent),
  },
   {
    path: 'reproductor',
    loadComponent: () =>
      import('./components/individual/reproductor/reproductor.component').then((m) => m.ReproductorComponent),
  },
    {
    path: 'calendarioDespliegue',
    loadComponent: () =>
      import('./components/individual/calentario/calendario-selection/calendario-despliegue.component').then((m) => m.CalentarioDespliegueComponent),
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
    path: 'podcast-despliegue/:id',
    loadComponent: () =>
      import('./components/despliegue-futuro/podcast-despliegue/podcast-despliegue.component').then((m) => m.PodcastDespliegueComponent),

  },
  {
    path: 'categorias-despliegue/:id',
    loadComponent: () =>
      import('./components/despliegue-futuro/categorias-despliegue/categorias-despliegue.component').then((m) => m.CategoriasDespliegueComponent),

  },
   {
    path: 'radio-despliegue/:id',
    loadComponent: () =>
      import('./components/despliegue-futuro/radio-despliegue/radio-despliegue.component').then((m) => m.RadioDespliegueComponent),

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

  },{
  path: 'siguenos',
  loadComponent: () =>
    import('./components/individual/profile/siguenos/siguenos.component')
      .then(m => m.SiguenosComponent)
  },
{
  path: 'favoritos',
  loadComponent: () =>
    import('./components/individual/profile/favoritos/favoritos.component')
      .then(m => m.FavoritosComponent)
  },
{
  path: 'notificaciones',
  loadComponent: () =>
    import('./components/individual/profile/notificaciones/notificaciones.component')
      .then(m => m.NotificacionesComponent)
  },
  {
  path: 'editprofile',
  loadComponent: () =>
    import('./components/individual/profile/edit-profile/editprofile.component')
      .then(m => m.EditprofileComponent)
  },
  {

    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'change-password',
    loadComponent: () => import('./pages/change-password/change-password.page').then(m => m.ChangePasswordPage)
  },
  {
  path: 'start',
  loadComponent: () => import('./pages/start/start.page').then(m => m.StartPage)
},
{
  path: 'select-language',
  loadComponent: () => import('./pages/select-language/select-language.page').then(m => m.SelectLanguagePage)
},
{
  path: 'select-category',
  loadComponent: () => import('./pages/select-category/select-category.page').then(m => m.SelectCategoryPage)
},
{
  path: 'intro-tour',
  loadComponent: () => import('./pages/intro-tour/intro-tour.page').then(m => m.IntroTourPage)
},
{
  path: 'bienvenida',
  loadComponent: () => import('./pages/bienvenida/bienvenida.page').then(m => m.BienvenidaPage)
},
  {
    path: 'callback',
    loadComponent: () => import('./pages/callback/callback.page').then( m => m.CallbackPage)
  },

];



/*
// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
 {
  path: 'home',
  canActivate: [authGuard],
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
  /*,{
  path: '',
  redirectTo: 'login',
  pathMatch: 'full',
}
,
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
  {
  path: 'noticia-despliegue/:id',
  loadComponent: () =>
    import('./components/despliegue-futuro/noticia-despliegue/noticia-despliegue.component')
      .then(m => m.NoticiaDespliegueComponent)
  },
  {
  path: 'login',
  loadComponent: () =>
    import('./components/primera-vez/login/login.component').then(m => m.LoginComponent),
}


];

*/
