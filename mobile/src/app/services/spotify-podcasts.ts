
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PodcastService { // Cambia el nombre si ya tienes otro servicio
  private baseUrl = 'http://localhost:3000/aaron/maslatino'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  // Método para obtener todos los podcasts
  getPodcasts(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/podcasts`);
  }
  getPodcastById(id:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/podcastIndividual`, {id});
  }

}