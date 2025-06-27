// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@capacitor/storage';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/aaron/maslatino'; // cambia esto por tu URL real

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(async (res: any) => {
        if (res.token && res.user) {
          await Storage.set({ key: 'token', value: res.token });
          await Storage.set({ key: 'user', value: JSON.stringify(res.user) });
        }
      }),
      catchError(err => {
        console.error('Error en login:', err);
        return throwError(() => err);
      })
    );
  }

  async logout() {
    await Storage.remove({ key: 'token' });
    await Storage.remove({ key: 'user' });
  }

  async isLoggedIn(): Promise<boolean> {
    const { value } = await Storage.get({ key: 'token' });
    return !!value;
  }

  async getUser(): Promise<any> {
    const { value } = await Storage.get({ key: 'user' });
    return value ? JSON.parse(value) : null;
  }
}
