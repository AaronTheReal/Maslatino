// spotify-podcasts.service.ts ejemplo de servicio de noticias
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Noticia {
  _id?: string;
  title: string;
  slug: string; // ✅ AÑADE ESTA LÍNEA
  summary?: string;
  author: string;
  categories: string[];
  tags?: string[];
  location?: { country?: string; region?: string; city?: string };
  content: any[]; // según tu modelo de bloques
  createdAt?: string;
  updatedAt?: string;
  meta?: {
    description?: string;
    image?: string;
  };
}


@Injectable({ providedIn: 'root' })
export class NoticiasService {
  // Ajusta la URL base según tu configuración:
  private baseUrl = 'http://localhost:3000/aaron/maslatino';
  //private baseUrl = 'https://maslatino.onrender.com/aaron/maslatino'; // Ajusta si tu backend cambia

  constructor(private http: HttpClient) {}
 // index.js (archivo principal del backend)

  createNoticia(data: Noticia): Observable<Noticia> {
    return this.http.post<Noticia>( `${this.baseUrl}/noticiasPost` , data);
  }

  getNoticias(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getNoticias`);
  }

}




  /*
 
  getNoticia(id: string): Observable<Noticia> {
    return this.http.get<Noticia>(`${this.baseUrl}/${id}`);
  }
  updateNoticia(id: string, data: Partial<Noticia>): Observable<Noticia> {
    return this.http.put<Noticia>(`${this.baseUrl}/${id}`, data);
  }
  deleteNoticia(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }

    */