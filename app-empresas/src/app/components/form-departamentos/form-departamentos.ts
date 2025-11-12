import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DepartamentoService } from '../../services/departamento';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-departamentos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './form-departamentos.html',
  styleUrls: ['./form-departamentos.scss']
})
export class FormDepartamentosComponent implements OnInit {

  departamento: any = { nome: '', local: '' };
  id: string | null = null;

  erros = {
    nome: '',
    local: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private departamentoService: DepartamentoService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.carregarDepartamento(this.id);
    }
  }

  carregarDepartamento(id: string) {
    this.departamentoService.buscarPorId(id).subscribe({
      next: (dados) => {
        this.departamento = dados;
      },
      error: (erro) => {
        console.error('Erro ao carregar departamento:', erro);
        Swal.fire('Erro', 'Erro ao carregar o departamento.', 'error');
      }
    });
  }

  validarCampos(): boolean {
    let valido = true;
    this.erros = { nome: '', local: '' };

    if (!this.departamento.nome || this.departamento.nome.trim() === '') {
      this.erros.nome = 'O nome do departamento é obrigatório.';
      valido = false;
    }

    if (!this.departamento.local || this.departamento.local.trim() === '') {
      this.erros.local = 'O local é obrigatório.';
      valido = false;
    }

    return valido;
  }

  salvar() {
    if (!this.validarCampos()) {
      return;
    }

    if (this.id) {
      this.departamentoService.atualizar(this.id, this.departamento).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Departamento atualizado!',
            text: 'As informações foram salvas com sucesso.',
            confirmButtonColor: '#16a34a',
          }).then(() => {
            this.router.navigate(['/departamentos']);
          });
        },
        error: () => {
          Swal.fire('Erro', 'Erro ao atualizar o departamento.', 'error');
        }
      });
    } else {
      const novoDepartamento = {
        nome: this.departamento.nome,
        local: this.departamento.local
      };

      this.departamentoService.cadastrar(novoDepartamento).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Departamento criado!',
            text: 'O novo departamento foi adicionado com sucesso.',
            confirmButtonColor: '#16a34a',
          }).then(() => {
            this.router.navigate(['/departamentos']);
          });
        },
        error: () => {
          Swal.fire('Erro', 'Erro ao criar o departamento.', 'error');
        }
      });
    }
  }

  voltar() {
    this.router.navigate(['/departamentos']);
  }
}
