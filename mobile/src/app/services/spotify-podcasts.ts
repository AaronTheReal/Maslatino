// podcast.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Episodio {
  _id: string;
  titulo: string;
  episodio: number;
  duracion: string;
  imagenUrl: string;
  audioUrl: string;
  favorito: boolean;
  [key: string]: any; // Para permitir campos adicionales como descripción, fecha, etc.
}


@Injectable({
  providedIn: 'root'
})
export class PodcastService {
  //private baseUrl = 'http://localhost:3000/aaron/maslatino';
  private baseUrl = 'https://maslatino.onrender.com/aaron/maslatino'; // Ajusta si tu backend cambia

  constructor(private http: HttpClient) {}

      getShows(): Observable<any[]> {
          return this.http.get<any>(`${this.baseUrl}/shows`).pipe(
            map(data => {
              // Ensure the response is an array
              if (Array.isArray(data)) {
                return data;
              } else if (data && data.shows && Array.isArray(data.shows)) {
                // Handle case where array is nested, e.g., { shows: [...] }
                return data.shows;
              } else {
                // Fallback to empty array if data is invalid
                return [];
              }
            })
          );
        }
  // Fetch a specific show by ID (including its episodes)
  getShowById(id: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/showIndividual`, {id});
  }

  // Existing methods for individual podcasts (if needed)
  getPodcasts(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/podcasts`);
  }

  getPodcastById(id: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/podcastIndividual`, { id });
  }
    getPodcastCategoria(nombreCategoria: string): Observable<{ results: any[] }> {
      const nombre = encodeURIComponent(nombreCategoria.trim());
      return this.http.get<{ results: any[] }>(
        `http://localhost:3000/aaron/maslatino/podcasts/by-category-name/${nombre}`
      );
    }
  // ✅ Obtener podcasts por ID de categoría
  getPodcastCategoriaPorId(id: string): Observable<{ results: Episodio[] } | Episodio[]> {
    return this.http.get<{ results: Episodio[] } | Episodio[]>(`${this.baseUrl}/podcasts/categoria/${id}`);
  }

}