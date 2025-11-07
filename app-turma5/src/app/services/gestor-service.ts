import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoGestor } from '../models/tipo-gestor';

@Injectable({
  providedIn: 'root',
})
export class GestorService {
    
  private http = inject(HttpClient)
  private readonly urlBase: string = 'http://localhost:3000/gestor'

  getGestor(): Observable<TipoGestor[]>{
    return this.http.get<TipoGestor[]>(this.urlBase)
  }

  getGestorPorId(id: string): Observable<TipoGestor>{
    return this.http.get<TipoGestor>(this.urlBase + id)
  }
}
