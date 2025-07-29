import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CategoriaPayload {
  _id: string;
  name: string;
  slug?: string;
  description?: string;
  image: string;
  color: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Noticia {
  _id: string;
  title: string;
  content: string;
  meta?: {
    image?: string;
  };
  [key: string]: any;
}

interface Episodio {
  _id: string;
  titulo: string;
  episodio: number;
  duracion: string;
  imagenUrl: string;
  audioUrl: string;
  favorito: boolean;
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private baseUrl = 'http://localhost:3000/aaron/maslatino';
  // private baseUrl = 'https://maslatino.onrender.com/aaron/maslatino';

  constructor(private http: HttpClient) {}

  // ✅ Crear una nueva categoría
  crearCategoria(data: CategoriaPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/categoriaPost`, data);
  }

  // ✅ Obtener todas las categorías
  obtenerCategorias(): Observable<CategoriaPayload[]> {
    return this.http.get<CategoriaPayload[]>(`${this.baseUrl}/categorias`);
  }

  // ✅ Obtener una categoría por ID
  obtenerCategoriaPorId(id: string): Observable<CategoriaPayload> {
    return this.http.get<CategoriaPayload>(`${this.baseUrl}/categorias/${id}`);
  }

  // ✅ Actualizar una categoría existente
  actualizarCategoria(id: string, data: CategoriaPayload): Observable<any> {
    return this.http.put(`${this.baseUrl}/categorias/${id}`, data);
  }

  // ✅ Eliminar una categoría
  eliminarCategoria(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/categorias/${id}`);
  }

}
