import { Routes } from '@angular/router';
import { Dashboard } from '../app/components/dashboard/dashboard/dashboard';
import { PanelAdmin } from '../app/components/admin/panel-admin/panel-admin';
import { PanelCalendario } from './components/admin/panel-calendario/panel-calendario';
import { PanelPodcast } from './components/admin/panel-podcast/panel-podcast';
import { PanelUsuarios } from './components/admin/panel-usuarios/panel-usuarios';
import { PanelMultimedia } from './components/admin/panel-multimedia/panel-multimedia';
import { PanelNoticias } from './components/admin/panel-noticias/panel-noticias';
import {PanelRadio} from './components/admin/panel-radio/panel-radio'

export const routes: Routes = [

      {path: '',component: Dashboard },

      {path: 'admin-panel',component: PanelAdmin },
      {path: 'usuarios-panel',component: PanelUsuarios },
      {path: 'calendario-panel',component: PanelCalendario },
      {path: 'multimedia-panel',component: PanelMultimedia },
      {path: 'noticias-panel',component: PanelNoticias },
      {path: 'podcast-panel',component: PanelPodcast },
      {path: 'radio-panel',component: PanelRadio },


    
];
