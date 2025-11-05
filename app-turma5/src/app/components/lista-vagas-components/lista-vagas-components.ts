import { Component, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-lista-vagas-components',
  imports: [],
  templateUrl: './lista-vagas-components.html',
  styleUrl: './lista-vagas-components.scss',
})
export class ListaVagasComponents {

  contador: WritableSignal<number> = signal(0);

  nomes: string[] = ["Matheus", "Gabriel", "Lucas"]

  add(): void {
    this.contador.update( valorAntigo => valorAntigo + 1 )
  }

}
