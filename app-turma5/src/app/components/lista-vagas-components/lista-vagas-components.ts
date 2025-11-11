// Importações principais do Angular
import { Component, OnInit, signal, WritableSignal } from '@angular/core';

// Importação dos serviços usados para comunicação com a API
import { VagaService } from '../../services/vaga-service';
import { GestorService } from '../../services/gestor-service';

// Importação dos modelos (interfaces) para garantir a tipagem dos dados
import { PedidoVaga } from '../../models/pedido-vaga';
import { TipoGestor } from '../../models/tipo-gestor';

// Importação de módulos adicionais
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Necessário para usar Pipes e diretivas comuns (ex: *ngFor, *ngIf)

// Decorator que define o componente
@Component({
  selector: 'app-lista-vagas-components', // Nome usado no HTML para chamar o componente
  imports: [CommonModule, RouterModule], // Módulos necessários no template
  templateUrl: './lista-vagas-components.html', // Caminho do arquivo HTML
  styleUrl: './lista-vagas-components.scss', // Caminho do arquivo de estilo
})
export class ListaVagasComponents implements OnInit {

  // Signal usado apenas como exemplo para contagem simples (contador)
  contador: WritableSignal<number> = signal(0);

  // Lista de nomes apenas para teste ou exemplo
  nomes: string[] = ["Matheus", "Gabriel", "Lucas"];

  // Lista reativa de pedidos de vaga (armazenada como Signal)
  pedidosVagas: WritableSignal<PedidoVaga[]> = signal([]);

  // Lista reativa de gestores (para cruzar com as vagas e mostrar o nome do gestor)
  gestor: WritableSignal<TipoGestor[]> = signal([]);

  // Construtor que injeta os serviços de Vagas e Gestores
  constructor(
    private vagasService: VagaService,
    private gestorService: GestorService
  ) { }

  // Método chamado assim que o componente é carregado
  ngOnInit(): void {
    this.carregarPedidos(); // Carrega a lista de vagas
    this.carregarGestores(); // Carrega a lista de gestores
  }

  // Incrementa o contador (usado como exemplo prático de atualização com Signals)
  add(): void {
    this.contador.update(valorAntigo => valorAntigo + 1);
  }

  // Busca todas as vagas cadastradas na API
  carregarPedidos(): void {
    this.vagasService.getPedidosVagas().subscribe({
      next: data => {
        // Atualiza o Signal com os dados recebidos
        this.pedidosVagas.set(data);
      },
      error: error => {
        console.log(error); // Exibe erro no console, caso ocorra
      }
    });
  }

  // Busca todos os gestores cadastrados na API
  carregarGestores(): void {
    this.gestorService.getGestor().subscribe({
      next: data => {
        // Atualiza o Signal com a lista de gestores
        this.gestor.set(data);
      },
      error: error => {
        console.log(error); // Exibe erro no console, caso ocorra
      }
    });
  }

  // Retorna o nome do gestor correspondente ao ID passado
  getNomeGestor(gestorId: string): string {
    let g = this.gestor().find(item => item.id === gestorId); // Procura o gestor pelo ID
    if (g) {
      return g.nome; // Retorna o nome se encontrado
    } else {
      return 'N/A'; // Retorna "N/A" se não encontrar
    }
  }

  // Converte a data do formato ISO para o formato brasileiro (dd/mm/aaaa)
  converteDate(iso: string): string {
    let d = new Date(iso);
    return d.toLocaleDateString('pt-br');
  }

  // Retorna uma classe CSS de acordo com o status da vaga
  voltaClassesStatus(status: string): string {
    switch (status) {
      case 'Aprovado':
        return 'verde'; // Classe para vagas aprovadas
      case 'Pendente':
        return 'amarelo'; // Classe para vagas pendentes
      case 'Reprovado':
        return 'vermelho'; // Classe para vagas reprovadas
      default:
        return ''; // Caso não tenha status definido
    }
  }

  // Exclui uma vaga do sistema com confirmação
  deletarVaga(id?: string): void {
    if (!id) return; // Se o ID não existir, sai da função
    if (confirm('Deseja realmente excluir esta vaga?')) {
      this.vagasService.deleteVaga(id).subscribe({
        next: () => {
          alert('Vaga excluída com sucesso!');
          // Recarrega a lista para atualizar a tabela na tela
          this.carregarPedidos();
        },
        error: (err) => console.error('Erro ao deletar vaga', err)
      });
    }
  }
}
