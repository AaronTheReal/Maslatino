// src/app/guards/auth.guard.ts
import { CanMatchFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/auth-service';
import { from, map } from 'rxjs';

export const authGuard: CanMatchFn = () => {
  const router = inject(Router);
  const auth = inject(AuthService);

  return from(auth.isLoggedIn()).pipe(
    map((logged) => {
      if (logged) {
        return true;
      }
      // Redirige y bloquea la carga del componente
      return router.parseUrl('/login');
    })
  );
};
