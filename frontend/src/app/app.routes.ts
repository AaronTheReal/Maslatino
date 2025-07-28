import { Routes } from '@angular/router';
import { Dashboard } from '../app/components/dashboard/dashboard/dashboard';
import { PanelAdmin } from '../app/components/admin/panel-admin/panel-admin';
import { PanelCalendario } from './components/admin/panel-calendario/panel-calendario';
import { PanelPodcast } from './components/admin/panel-podcast/panel-podcast';
import { PanelCalendarioPc } from './components/admin/panel-calendario/panel-calendario-pc/panel-calendario-pc';
import { PanelUsuarios } from './components/admin/panel-usuarios/panel-usuarios';
import { PanelMultimedia } from './components/admin/panel-multimedia/panel-multimedia';
import { PanelNoticias } from './components/admin/panel-noticias/panel-noticias';
import {PanelRadio} from './components/admin/panel-radio/panel-radio'
import {NoticiaIndividual} from './components/individual/noticia-individual/noticia-individual'
import {SobreNosotros} from './components/individual/sobre-nosotros/sobre-nosotros'
import {PanelCategorias} from './components/admin/panel-categorias/panel-categorias'

export const routes: Routes = [

      {path: '',component: Dashboard },

      {path: 'admin-panel',component: PanelAdmin },
      {path: 'usuarios-panel',component: PanelUsuarios },
      {path: 'calendario-panel',component: PanelCalendario },
      {path: 'calendario-panel-pc', component: PanelCalendarioPc },
      {path: 'multimedia-panel',component: PanelMultimedia },
      {path: 'noticias-panel',component: PanelNoticias },
      {path: 'podcast-panel',component: PanelPodcast },
      {path: 'radio-panel',component: PanelRadio },
      {path: 'categorias-panel',component: PanelCategorias },

 
      { path: 'noticia/:slug', component: NoticiaIndividual, data: { prerender: true } },
      { path: 'sobre-nosotros', component: SobreNosotros },




    
];
