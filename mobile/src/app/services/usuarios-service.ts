// spotify-podcasts.service.ts ejemplo de servicio de noticias
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient) {}
 // index.js (archivo principal del backend)

  createUsuario(data: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>( `${this.baseUrl}/registrarUsuario` , data);
  }


}


