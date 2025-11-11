import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PedidoVaga } from '../models/pedido-vaga';

@Injectable({
  providedIn: 'root',
})
export class VagaService {

  private http = inject(HttpClient)
  private readonly urlBase: string = 'http://localhost:3000/vagas'

  getPedidosVagas(): Observable<PedidoVaga[]> {
    return this.http.get<PedidoVaga[]>(this.urlBase)
  }

  getPedidoVagasPorId(id: string): Observable<PedidoVaga> {
    return this.http.get<PedidoVaga>(this.urlBase + id)
  }

  getVagaById(id: string): Observable<PedidoVaga> {
    return this.http.get<PedidoVaga>(`${this.urlBase}/${id}`);
  }

  postVaga(vaga: PedidoVaga): Observable<PedidoVaga> {
    return this.http.post<PedidoVaga>(this.urlBase, vaga);
  }

  putVaga(id: string, vaga: PedidoVaga): Observable<PedidoVaga> {
    return this.http.put<PedidoVaga>(`${this.urlBase}/${id}`, vaga);
  }

  deleteVaga(id: string): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${id}`);
  }
}
