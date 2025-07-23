import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class PodcastService {
  private baseUrl = 'http://localhost:3000/aaron/maslatino'; // Ajusta si tu backend cambia

  constructor(private http: HttpClient) {}

}
