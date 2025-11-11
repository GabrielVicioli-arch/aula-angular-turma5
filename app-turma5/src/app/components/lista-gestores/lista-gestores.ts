// Importação dos módulos principais do Angular e dependências necessárias
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Importação dos services responsáveis pelas requisições HTTP
import { GestorService } from '../../services/gestor-service';
import { DepartamentoService } from '../../services/departamento-services';

// Importação dos modelos (interfaces) para tipagem
import { TipoGestor } from '../../models/tipo-gestor';
import { TipoDepartamento } from '../../models/tipo-departamento';

// Decorator que define o componente Angular
@Component({
  selector: 'app-lista-gestores', // Nome usado para chamar o componente no HTML
  standalone: true, // Define que o componente é independente (não precisa de módulo)
  imports: [CommonModule, FormsModule], // Módulos utilizados no template
  templateUrl: './lista-gestores.html', // Caminho do arquivo HTML
  styleUrl: './lista-gestores.scss' // Caminho do arquivo de estilo SCSS
})
export class ListaGestoresComponent implements OnInit {

  // Lista reativa de gestores (armazenada como Signal)
  gestores: WritableSignal<TipoGestor[]> = signal([]);

  // Lista reativa de departamentos (para exibir no select)
  departamentos: WritableSignal<TipoDepartamento[]> = signal([]);

  // Controle de edição (se está editando ou criando um novo)
  editando: boolean = false;
  idEditando: string | null = null; // Guarda o ID do gestor que está sendo editado

  // Objeto do formulário de cadastro/edição
  novoGestor: TipoGestor = {
    nome: '',
    email: '',
    cargo: '',
    departamentoId: ''
  };

  // Injeção dos serviços (Gestor e Departamento)
  constructor(
    private gestorService: GestorService,
    private departamentoService: DepartamentoService
  ) {}

  // Método executado ao iniciar o componente
  ngOnInit(): void {
    this.carregarGestor(); // Carrega a lista de gestores
    this.carregarDepartamentos(); // Carrega a lista de departamentos
  }

  // Busca todos os gestores da API e atualiza a lista
  carregarGestor(): void {
    this.gestorService.getGestor().subscribe({
      next: data => this.gestores.set(data), // Armazena os dados recebidos no Signal
      error: err => console.log(err) // Mostra erro no console, se ocorrer
    });
  }

  // Busca todos os departamentos da API
  carregarDepartamentos(): void {
    this.departamentoService.getDepartamento().subscribe({
      next: data => this.departamentos.set(data),
      error: err => console.log(err)
    });
  }

  // Retorna o nome do departamento a partir do ID (para exibir na tabela)
  getNomeDepartamento(departamentoId: string): string {
    return this.departamentos().find(dep => dep.id === departamentoId)?.departamento || '';
  }

  // Salva um novo gestor ou atualiza um existente
  salvarGestor(): void {
    if (this.editando && this.idEditando) {
      // Caso esteja em modo de edição → Atualiza o gestor
      this.gestorService.putGestor(this.idEditando, this.novoGestor).subscribe({
        next: () => {
          alert('Gestor atualizado com sucesso!');
          this.resetarFormulario();
          this.carregarGestor(); // Atualiza a lista na tela
        },
        error: (err) => console.error(err)
      });
    } else {
      // Caso contrário → Cria um novo gestor
      this.gestorService.postGestor(this.novoGestor).subscribe({
        next: () => {
          alert('Gestor adicionado com sucesso!');
          this.resetarFormulario();
          this.carregarGestor(); // Atualiza a lista
        },
        error: (err) => console.error(err)
      });
    }
  }

  // Preenche o formulário com os dados do gestor selecionado para edição
  editarGestor(gestor: TipoGestor): void {
    this.novoGestor = { ...gestor }; // Clona os dados do gestor
    this.idEditando = gestor.id!; // Guarda o ID do gestor que está sendo editado
    this.editando = true; // Altera o estado para modo edição
  }

  // Exclui um gestor do sistema
  deletarGestor(id?: string): void {
    if (!id) return; // Verifica se o ID foi informado
    if (confirm('Deseja realmente deletar este gestor?')) {
      this.gestorService.deleteGestor(id).subscribe({
        next: () => {
          alert('Gestor deletado com sucesso!');
          this.carregarGestor(); // Atualiza a lista após exclusão
        },
        error: (err) => console.error(err)
      });
    }
  }

  // Reseta o formulário para o estado inicial
  resetarFormulario(): void {
    this.novoGestor = { nome: '', email: '', cargo: '', departamentoId: '' };
    this.idEditando = null;
    this.editando = false;
  }
}
