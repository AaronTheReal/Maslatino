// spotify-podcasts.service.ts ejemplo de servicio de noticias
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service';

export interface Usuario {
  name: string;
  email: string;
  password: string;
  gender: 'male' | 'female';
  country: string;
  provider: string;
  providerId: string;
  avatar?: string;
  categories: string[];
  language: 'es' | 'en' | 'fr' | 'pt';
}

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  // Ajusta la URL base según tu configuración:
  private baseUrl = 'http://localhost:3000/aaron/maslatino';

  constructor(private http: HttpClient,public authService:AuthService ) {}
 // index.js (archivo principal del backend)

  createUsuario(data: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>( `${this.baseUrl}/registrarUsuario` , data);
  }

  updateLanguage(providerId: string, language: string): Observable<any> {
    const url = `${this.baseUrl}/IdiomaUsuarioInicio`;
    const body = { providerId, language };
    return this.http.put(url, body);
  }

// usuarios-service.ts
updateLanguageUser(language: string): Observable<any> {
  return new Observable((observer) => {
    this.authService.getUser().then(user => {
      const body = { providerId: user.providerId, language };
      this.http.put(`${this.baseUrl}/update-language`, body).subscribe({
        next: (res) => observer.next(res),
        error: (err) => observer.error(err),
        complete: () => observer.complete()
      });
    }).catch(err => observer.error(err));
  });
}

}


