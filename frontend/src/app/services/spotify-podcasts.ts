// spotify-podcasts.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SpotifyPodcastsService {
  //private baseUrl = 'http://localhost:3000/aaron/maslatino'; // Ajuste necesario para que coincida con tu backend
  private baseUrl = 'https://maslatino.onrender.com/aaron/maslatino'; // Ajusta si tu backend cambia

  constructor(private http: HttpClient) {}

  searchPodcasts(query: string) {
    return this.http.get<any[]>(`${this.baseUrl}/search?q=${encodeURIComponent(query)}`);
  }
}
