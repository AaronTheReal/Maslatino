// spotify-podcasts.service.ts ejemplo de servicio de noticias
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Noticia } from '../models/noticia.model';


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

getNoticiasRecientes(limit = 5) {
  return this.http.get<Noticia[]>(`${this.baseUrl}/noticias/recientes?limit=${limit}`);
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