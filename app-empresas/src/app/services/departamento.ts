import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoDepartamento } from '../models/tipo-departamento-module';

@Injectable({ 
  providedIn: 'root' 
})
export class DepartamentoService {
  private apiUrl = 'http://localhost:3000/departamentos';

  constructor(private http: HttpClient) {}

  // 🔹 Lista todos os departamentos
  listarDepartamentos(): Observable<TipoDepartamento[]> {
    return this.http.get<TipoDepartamento[]>(this.apiUrl);
  }

  // 🔹 Busca um departamento específico pelo ID (usado na edição)
  buscarPorId(id: string): Observable<TipoDepartamento> {
    return this.http.get<TipoDepartamento>(`${this.apiUrl}/${id}`);
  }

  // 🔹 Cadastra novo departamento
  cadastrar(departamento: TipoDepartamento): Observable<TipoDepartamento> {
    return this.http.post<TipoDepartamento>(this.apiUrl, departamento);
  }

  // 🔹 Atualiza um departamento existente
  atualizar(id: string, departamento: TipoDepartamento): Observable<TipoDepartamento> {
    return this.http.put<TipoDepartamento>(`${this.apiUrl}/${id}`, departamento);
  }

  // 🔹 Deleta um departamento
  deletar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
