import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoDepartamento } from '../models/tipo-departamento';


@Injectable({
  providedIn: 'root',
})
export class DepartamentoService {
  private http = inject(HttpClient)
  private readonly urlBase: string = 'http://localhost:3000/departamento'

  getDepartamento(): Observable<TipoDepartamento[]> {
    return this.http.get<TipoDepartamento[]>(this.urlBase)
  }

  postCriarDepartamento(dados: TipoDepartamento): Observable<TipoDepartamento> {
    return this.http.post<TipoDepartamento>(this.urlBase, dados);
  }

}