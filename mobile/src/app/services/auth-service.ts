// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
import { Observable, throwError, from } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://maslatino.onrender.com/aaron/maslatino'; // URL base de tu backend

  constructor(private http: HttpClient) {}

  // Login y guarda token/usuario en Preferences
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(async (res: any) => {
        if (res.token && res.user) {
          await Preferences.set({ key: 'token', value: res.token });
          await Preferences.set({ key: 'user', value: JSON.stringify(res.user) });
        }
      }),
      catchError(err => {
        console.error('Error en login:', err);
        return throwError(() => err);
      })
    );
  }

  // Cierra sesión limpiando storage
  async logout(): Promise<void> {
    await Preferences.remove({ key: 'token' });
    await Preferences.remove({ key: 'user' });
    await Preferences.remove({ key: 'hasCompletedOnboarding' });
    await Preferences.remove({ key: 'selectedLanguage' });
  }


  // Verifica si hay token activo
  async isLoggedIn(): Promise<boolean> {
    const { value } = await Preferences.get({ key: 'token' });
    return !!value;
  }

  // Obtiene el usuario local (desde Preferences)
  async getUser(): Promise<any> {
    const { value } = await Preferences.get({ key: 'user' });
    return value ? JSON.parse(value) : null;
  }

  // Obtiene el usuario desde el backend
  getUserBack(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-user/${id}`);
  }
}
