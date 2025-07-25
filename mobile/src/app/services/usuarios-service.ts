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


addFavoriteToUse(noticia: string,Tipo:string,IdUsuario:string ): Observable<any> {

 return this.http.put(`${this.baseUrl}/add-favorites`, {noticia, Tipo,IdUsuario});
  };
 removeFavorite(noticia: string,Tipo:string,IdUsuario:string ): Observable<any> {

 return this.http.put(`${this.baseUrl}/remove-favorites`, {noticia, Tipo,IdUsuario});
  };
  
isFavorite(noticia: string, Tipo: string, IdUsuario: string): Observable<{ isFavorite: boolean }> {
  return this.http.post<{ isFavorite: boolean }>(`${this.baseUrl}/check-favorite`, {
    noticia,
    Tipo,
    IdUsuario
  });
}
getFavorites(userId: string): Observable<{
  noticias: any[],
  podcasts: any[],
  episodios: any[]
}> {
  return this.http.get<{
    noticias: any[],
    podcasts: any[],
    episodios: any[]
  }>(`${this.baseUrl}/get-favorites/${userId}`);
}

getByCategory(categoria: string): Observable<{
  noticias: any[],
  podcasts: any[],
  episodios: any[]
}> {
  return this.http.get<{
    noticias: any[],
    podcasts: any[],
    episodios: any[]
  }>(`${this.baseUrl}/get-by-category/${categoria}`);
}
setLastPlayed(userId: string, podcastId: string, episodeId: string, position: number = 0, isPaused: boolean = true): Observable<any> {
  return this.http.post(`${this.baseUrl}/usuarios/${userId}/last-played`, {
    podcastId,
    episodeId,
    position,
    isPaused
  });
}

getLastPlayed(userId: string): Observable<{
  podcast: any,
  episode: any,
  playerState: {
    position: number,
    isPaused: boolean,
    playedAt: string
  }
}> {
  return this.http.get<{
    podcast: any,
    episode: any,
    playerState: {
      position: number,
      isPaused: boolean,
      playedAt: string
    }
  }>(`${this.baseUrl}/usuarios/${userId}/last-played`);
}

}


