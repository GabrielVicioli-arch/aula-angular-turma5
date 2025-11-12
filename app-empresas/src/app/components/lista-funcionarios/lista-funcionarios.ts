import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FuncionarioService } from '../../services/funcionario';
import { DepartamentoService } from '../../services/departamento';
import { TipoFuncionario } from '../../models/tipo-funcionario-module';
import { TipoDepartamento } from '../../models/tipo-departamento-module';
import Swal from 'sweetalert2' // ✅ Import do SweetAlert2

@Component({
  selector: 'app-lista-funcionarios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './lista-funcionarios.html',
  styleUrls: ['./lista-funcionarios.scss']
})
export class ListaFuncionariosComponent implements OnInit {

  funcionarios: TipoFuncionario[] = [];
  departamentos: TipoDepartamento[] = [];

  filtroNome: string = '';
  filtroCargo: string = '';

  nomesUnicos: string[] = [];
  cargosUnicos: string[] = [];

  constructor(
    private funcionarioService: FuncionarioService,
    private departamentoService: DepartamentoService
  ) { }

  ngOnInit(): void {
    this.listarFuncionarios();
  }

  listarFuncionarios(): void {
    this.departamentoService.listarDepartamentos().subscribe((departamentos) => {
      this.departamentos = departamentos;

      this.funcionarioService.listar().subscribe((funcionarios) => {
        this.funcionarios = funcionarios;
        this.gerarListasDeFiltros();
      });
    });
  }

  gerarListasDeFiltros(): void {
    const nomes = this.funcionarios.map(f => f.nome);
    const cargos = this.funcionarios.map(f => f.cargo);

    this.nomesUnicos = [...new Set(nomes)];
    this.cargosUnicos = [...new Set(cargos)];
  }

  obterNomeDepartamento(id: string): string {
    const dep = this.departamentos.find(d => d.id === id);
    return dep ? dep.nome : '---';
  }

  funcionariosFiltrados(): TipoFuncionario[] {
    return this.funcionarios.filter(f => {
      const nomeOk = this.filtroNome ? f.nome === this.filtroNome : true;
      const cargoOk = this.filtroCargo ? f.cargo === this.filtroCargo : true;
      return nomeOk && cargoOk;
    });
  }

  limparFiltros(): void {
    this.filtroNome = '';
    this.filtroCargo = '';
  }

  // ✅ Agora com SweetAlert2
  deletarFuncionario(id: string): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Essa ação não poderá ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.funcionarioService.deletar(id).subscribe(() => {
          Swal.fire('Excluído!', 'Funcionário excluído com sucesso.', 'success');
          this.listarFuncionarios(); // ✅ Atualiza a tabela
        });
      }
    });
  }
}
