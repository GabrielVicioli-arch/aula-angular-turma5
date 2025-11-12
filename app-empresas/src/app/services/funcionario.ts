import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoFuncionario } from '../models/tipo-funcionario-module';

@Injectable({ providedIn: 'root' })
export class FuncionarioService {
  private apiUrl = 'http://localhost:3000/funcionarios';

  constructor(private http: HttpClient) { }

  listar(): Observable<TipoFuncionario[]> {
    return this.http.get<TipoFuncionario[]>(this.apiUrl);
  }

  buscarPorId(id: string): Observable<TipoFuncionario> {
    return this.http.get<TipoFuncionario>(`${this.apiUrl}/${id}`);
  }

  criar(funcionario: TipoFuncionario): Observable<TipoFuncionario> {
    return this.http.post<TipoFuncionario>(this.apiUrl, funcionario);
  }

  atualizar(id: string, funcionario: TipoFuncionario): Observable<TipoFuncionario> {
    return this.http.put<TipoFuncionario>(`${this.apiUrl}/${id}`, funcionario);
  }

  deletar(id: string) {
    return this.http.delete(`http://localhost:3000/funcionarios/${id}`);
  }

}
