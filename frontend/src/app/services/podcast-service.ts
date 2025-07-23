import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface MetaData {
  description?: string;
  image?: string;
}
export interface EpisodePayload {
  _id?: string;
  title: string;
  description?: string;
  audioUrl: string;
  image?: string;
  duration?: number;
  releaseDate?: string;
}

export interface PodcastPayload {
  _id?: string;
  title: string;
  description?: string;
  authorName?: string;
  coverImage?: string;
  language: string;
  categories: string[];
  tags?: string[];
  episodes?: EpisodePayload[];
  meta?: MetaData; // 👈 Agrega esta línea
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({ providedIn: 'root' })
export class PodcastService {
  private API_URL = 'http://localhost:3000/aaron/maslatino/podcasts'; // cámbialo según tu backend

  constructor(private http: HttpClient) {}

  crearPodcast(payload: PodcastPayload): Observable<PodcastPayload> {
    return this.http.post<PodcastPayload>(this.API_URL, payload);
  }

  obtenerPodcasts(): Observable<PodcastPayload[]> {
    return this.http.get<PodcastPayload[]>(this.API_URL);
  }

  actualizarPodcast(id: string, payload: PodcastPayload): Observable<PodcastPayload> {
    return this.http.put<PodcastPayload>(`${this.API_URL}/${id}`, payload);
  }

  eliminarPodcast(id: string): Observable<{ mensaje: string }> {
    return this.http.delete<{ mensaje: string }>(`${this.API_URL}/${id}`);
  }

  agregarEpisodio(podcastId: string, episode: EpisodePayload): Observable<EpisodePayload> {
    return this.http.post<EpisodePayload>(`${this.API_URL}/${podcastId}/episodios`, episode);
  }

  editarEpisodio(podcastId: string, episodioId: string, episode: EpisodePayload): Observable<EpisodePayload> {
    return this.http.put<EpisodePayload>(`${this.API_URL}/${podcastId}/episodios/${episodioId}`, episode);
  }

  eliminarEpisodio(podcastId: string, episodioId: string): Observable<{ mensaje: string }> {
    return this.http.delete<{ mensaje: string }>(`${this.API_URL}/${podcastId}/episodios/${episodioId}`);
  }
}