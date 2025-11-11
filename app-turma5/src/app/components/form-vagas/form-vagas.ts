// Importações principais do Angular e dos serviços usados
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Importação dos serviços e modelos usados
import { VagaService } from '../../services/vaga-service';
import { GestorService } from '../../services/gestor-service';
import { PedidoVaga } from '../../models/pedido-vaga';
import { TipoGestor } from '../../models/tipo-gestor';

@Component({
  selector: 'app-form-vagas', // nome da tag HTML para usar este componente
  standalone: true, // indica que o componente é independente (não precisa de módulo)
  imports: [FormsModule, CommonModule, RouterModule], // módulos que o componente usa
  templateUrl: './form-vagas.html', // arquivo HTML do componente
  styleUrl: './form-vagas.scss' // arquivo de estilo (CSS/SCSS)
})
export class FormVagasComponent implements OnInit {

  // Título da página (muda se for criar ou editar uma vaga)
  tituloPagina: string = 'Nova Vaga';

  // ID vinda pela URL (caso o usuário esteja editando uma vaga existente)
  idUrl: string | null = null;

  // Objeto principal da vaga (com os campos que serão preenchidos no formulário)
  vaga: PedidoVaga = {
    titulo: '',
    motivo: '',
    requisitos: [],
    quantidade: 0,
    aprovacao: 'Pendente',
    gestorId: '',
    dataSolicitacao: new Date().toISOString() // pega a data atual automaticamente
  };

  // Campo auxiliar para adicionar novos requisitos
  novoRequisito: string = '';

  // Lista de gestores que vem do backend (para selecionar no form)
  gestores: TipoGestor[] = [];

  // Lista com as opções possíveis para o status da vaga
  statusOpcoes: string[] = ['Pendente', 'Aprovado', 'Reprovado'];

  // Construtor: injeta os serviços necessários
  constructor(
    private route: ActivatedRoute,    // usado para pegar parâmetros da URL
    private router: Router,           // usado para navegar entre páginas
    private vagaService: VagaService, // faz requisições de vagas (GET, POST, PUT)
    private gestorService: GestorService, // busca lista de gestores
    private cdr: ChangeDetectorRef    // usado para atualizar o template manualmente
  ) {}

  // Executa assim que o componente é iniciado
  ngOnInit(): void {

    // Pega o "id" que vem na URL (caso esteja editando uma vaga)
    this.idUrl = this.route.snapshot.paramMap.get('id');

    // Se tiver um id, significa que estamos EDITANDO uma vaga
    if (this.idUrl) {
      this.tituloPagina = 'Editar Vaga';

      // Busca os dados da vaga pelo ID
      this.vagaService.getVagaById(this.idUrl).subscribe({
        next: (dados) => {
          this.vaga = dados; // atribui os dados recebidos ao objeto "vaga"
          
          // Força o Angular a atualizar o HTML imediatamente
          // Isso resolve o problema de precisar clicar fora para aparecer os dados
          this.cdr.detectChanges(); 
        },
        error: (err) => console.error('Erro ao carregar vaga', err)
      });
    }

    // Carrega a lista de gestores (sempre é executado)
    this.carregarGestores();
  }

  // Função para buscar todos os gestores disponíveis
  carregarGestores(): void {
    this.gestorService.getGestor().subscribe({
      next: (res) => this.gestores = res,
      error: (err) => console.error('Erro ao carregar gestores', err)
    });
  }

  // Adiciona um novo requisito à vaga (ex: "Conhecimento em Angular")
  adicionarRequisito(): void {
    // só adiciona se o campo não estiver vazio
    if (this.novoRequisito.trim() !== '') {
      this.vaga.requisitos.push(this.novoRequisito);
      this.novoRequisito = ''; // limpa o campo de texto
    }
  }

  // Remove um requisito da lista, usando o índice
  removerRequisito(index: number): void {
    this.vaga.requisitos.splice(index, 1);
  }

  // Função que salva a vaga (tanto para criar quanto editar)
  salvar(): void {
    // Se tiver ID, estamos atualizando uma vaga existente
    if (this.idUrl) {
      this.vagaService.putVaga(this.idUrl, this.vaga).subscribe({
        next: () => {
          alert('Vaga atualizada com sucesso!');
          this.router.navigate(['/lista-vagas']); // volta para a lista de vagas
        },
        error: (err) => console.error('Erro ao atualizar', err)
      });
    } 
    // Se não tiver ID, estamos criando uma nova vaga
    else {
      this.vagaService.postVaga(this.vaga).subscribe({
        next: () => {
          alert('Vaga criada com sucesso!');
          this.router.navigate(['/lista-vagas']); // volta para a lista de vagas
        },
        error: (err) => console.error('Erro ao criar vaga', err)
      });
    }
  }
}
