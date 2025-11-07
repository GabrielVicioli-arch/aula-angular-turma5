import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { VagaService } from '../../services/vaga-service';
import { PedidoVaga } from '../../models/pedido-vaga';
import { TipoGestor } from '../../models/tipo-gestor';

// para utilizar o Pipe 
import { CommonModule } from '@angular/common';
import { GestorService } from '../../services/gestor-service';

@Component({
  selector: 'app-lista-vagas-components',
  imports: [CommonModule],
  templateUrl: './lista-vagas-components.html',
  styleUrl: './lista-vagas-components.scss',
})
export class ListaVagasComponents implements OnInit {

  contador: WritableSignal<number> = signal(0);

  nomes: string[] = ["Matheus", "Gabriel", "Lucas"]

  pedidosVagas: WritableSignal<PedidoVaga[]> = signal([])

  gestor: WritableSignal<TipoGestor[]> = signal([])

  constructor(
    private vagasService: VagaService,
    private gestorService: GestorService
  ){}

  ngOnInit(): void {
    this.carregarPedidos()
    this.carregarGestores()
  }

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
  
carregarGestores(): void {
  this.gestorService.getGestor().subscribe({
    next: data => {
      console.log(data)
      this.gestor.set(data)
    },
    error: error => {
      console.log(error)
    }
  })
}

getNomeGestor(gestorId: string): string {
  let g = this.gestor().find(item => item.id === gestorId);
  if(g){
    return g.nome
  } else{
    return 'N/A'
  }
}


  converteDate(iso: string): string{
    let d =  new Date(iso)
    return d.toLocaleDateString('pt-br')
  }

  voltaClassesStatus(status: string): string{
    switch(status){
      case 'Aprovado':
        return 'verde'
      case 'Pendente':
        return 'amarelo'
      case 'Reprovado':
        return 'vermelho'
      default:
        return ''
    }
  }
}