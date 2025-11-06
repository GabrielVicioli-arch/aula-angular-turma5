import { Component, signal, WritableSignal } from '@angular/core';
import { VagaService } from '../../services/vaga-service';
import { PedidoVaga } from '../../models/pedido-vaga';

@Component({
  selector: 'app-lista-vagas-components',
  imports: [],
  templateUrl: './lista-vagas-components.html',
  styleUrl: './lista-vagas-components.scss',
})
export class ListaVagasComponents {

  contador: WritableSignal<number> = signal(0);

  nomes: string[] = ["Matheus", "Gabriel", "Lucas"]

  pedidosVagas: WritableSignal<PedidoVaga[]> = signal([])

  constructor(private vagasService: VagaService){}

  add(): void {
    this.contador.update( valorAntigo => valorAntigo + 1 )
  }

  carregarPedidos(): void{
    this.vagasService.getPedidosVagas().subscribe({
      next: data => {
        console.log(data)
        this.pedidosVagas.set(data)
      }, error: error =>{
        console.log(error)
      }
    })
  }

}
