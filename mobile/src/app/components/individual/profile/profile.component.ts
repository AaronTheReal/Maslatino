// src/app/components/individual/profile/profile.component.ts
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Si tienes un UserService, descomenta e inyecta para obtener datos reales
// import { UserService } from 'src/app/services/user.service';

interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string; // URL de la imagen de perfil, opcional
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: UserProfile = {
    // Valores por defecto o de prueba. Reemplaza obteniendo de tu UserService.
    name: 'Nombre Apellido',
    email: 'usuario@ejemplo.com',
    avatarUrl: '', // deja vacío para mostrar iniciales
  };

  // Define las opciones de menú en un array para iterar en template
  menuSections: Array<{
    header?: string;
    items: Array<{
      label: string;
      icon: string;
      action: () => void;
    }>;
  }> = [];

  constructor(
    private router: Router,
    // private userService: UserService
  ) {}

  ngOnInit() {
    // Ejemplo: si tienes un UserService, obtén los datos reales:
    // this.userService.getProfile().subscribe(profile => this.user = profile);

    // Configura los items de menú:
    this.menuSections = [
      {
        header: 'General',
        items: [
          {
            label: 'Categorías',
            icon: 'grid-outline',
            action: () => this.navigateTo('/categorias'),
          },
          {
            label: 'Favoritos',
            icon: 'heart-outline',
            action: () => this.navigateTo('/favoritos'),
          },
          {
            label: 'Notificaciones',
            icon: 'notifications-outline',
            action: () => this.navigateTo('/notificaciones'),
          },
          {
            label: 'Síguenos',
            icon: 'people-outline',
            action: () => this.navigateTo('/siguenos'),
          },
          {
            label: 'Cambiar idioma',
            icon: 'language-outline',
            action: () => this.navigateTo('/settings/language'),
          },     {
            label: 'Admin-Panel',
            icon: 'admin-panel',
            action: () => this.navigateTo('/admin-panel'),
          },
          {
            label: 'Cerrar sesión',
            icon: 'log-out-outline',
            action: () => this.logout(),
          },
        ],
      },
      // Puedes añadir más secciones si lo requieres:
      // {
      //   header: 'Privacidad',
      //   items: [
      //     { label: 'Seguridad', icon: 'shield-checkmark-outline', action: () => this.navigateTo('/seguridad') },
      //     ...
      //   ]
      // }
    ];
  }

  /** Navega a una ruta interna */
  navigateTo(path: string) {
    // Ajusta según tu esquema de rutas
    this.router.navigate([path]);
  }

  /** Acción de editar perfil */
  editProfile() {
    // Navega a página de edición de perfil
    this.router.navigate(['/profile/edit']);
  }

  /** Cerrar sesión */
  logout() {
    // Lógica de logout: invocar tu servicio de autenticación, limpiar tokens, etc.
    // this.authService.logout();
    // Luego navegar a login o landing
    this.router.navigate(['/login']);
  }

  /** Devuelve iniciales si no hay avatarUrl */
  get initials(): string {
    if (!this.user.name) {
      return '';
    }
    const parts = this.user.name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    const first = parts[0].charAt(0).toUpperCase();
    const last = parts[parts.length - 1].charAt(0).toUpperCase();
    return `${first}${last}`;
  }
}
