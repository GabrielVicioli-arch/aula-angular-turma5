import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DepartamentoService } from '../../services/departamento';
import Swal from 'sweetalert2'; // ✅ Import do SweetAlert2

@Component({
  selector: 'app-lista-departamentos',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './lista-departamentos.html',
  styleUrls: ['./lista-departamentos.scss'],
})
export class ListaDepartamentoComponent implements OnInit {

  departamentos: any[] = [];

  filtroNome: string = '';
  filtroLocal: string = '';

  nomesUnicos: string[] = [];
  locaisUnicos: string[] = [];

  constructor(private departamentoService: DepartamentoService) { }

  ngOnInit() {
    this.carregarDepartamentos();
  }

  carregarDepartamentos() {
    this.departamentoService.listarDepartamentos().subscribe({
      next: (dados) => {
        this.departamentos = dados;
        this.nomesUnicos = [...new Set(dados.map(d => d.nome))];
        this.locaisUnicos = [...new Set(dados.map(d => d.local))];
      },
      error: (erro) => console.error('Erro ao carregar departamentos:', erro)
    });
  }

  departamentosFiltrados() {
    return this.departamentos.filter(d =>
      (this.filtroNome === '' || d.nome === this.filtroNome) &&
      (this.filtroLocal === '' || d.local === this.filtroLocal)
    );
  }

  limparFiltros() {
    this.filtroNome = '';
    this.filtroLocal = '';
  }

  // ✅ Agora com SweetAlert2
  deletarDepartamento(id: string | undefined) {
    if (!id) {
      Swal.fire('Erro', 'ID do departamento não encontrado.', 'error');
      return;
    }

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
        this.departamentoService.deletar(id).subscribe({
          next: () => {
            Swal.fire('Excluído!', 'Departamento excluído com sucesso.', 'success');
            this.carregarDepartamentos();
          },
          error: (erro) => {
            console.error('Erro ao excluir departamento:', erro);
            Swal.fire('Erro', 'Não foi possível excluir o departamento.', 'error');
          }
        });
      }
    });
  }
}
