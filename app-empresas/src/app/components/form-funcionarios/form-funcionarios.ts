import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FuncionarioService } from '../../services/funcionario';
import { DepartamentoService } from '../../services/departamento';
import { TipoFuncionario } from '../../models/tipo-funcionario-module';
import { TipoDepartamento } from '../../models/tipo-departamento-module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-funcionarios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './form-funcionarios.html',
  styleUrls: ['./form-funcionarios.scss']
})
export class FormFuncionariosComponent implements OnInit {

  funcionario: TipoFuncionario = { id: '', nome: '', cargo: '', salario: 0, departamentoId: '' };
  departamentos: TipoDepartamento[] = [];
  modoEdicao: boolean = false;

  erros = {
    nome: '',
    cargo: '',
    salario: '',
    departamentoId: ''
  };

  constructor(
    private funcionarioService: FuncionarioService,
    private departamentoService: DepartamentoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.departamentoService.listarDepartamentos().subscribe((dados) => {
      this.departamentos = dados;
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = idParam as string;
      this.modoEdicao = true;
      this.funcionarioService.buscarPorId(id).subscribe((dados) => {
        this.funcionario = dados;
      });
    }
  }

  validarCampos(): boolean {
    let valido = true;
    this.erros = { nome: '', cargo: '', salario: '', departamentoId: '' };

    if (!this.funcionario.nome || this.funcionario.nome.trim() === '') {
      this.erros.nome = 'O nome é obrigatório.';
      valido = false;
    }

    if (!this.funcionario.cargo || this.funcionario.cargo.trim() === '') {
      this.erros.cargo = 'O cargo é obrigatório.';
      valido = false;
    }

    if (this.funcionario.salario === null || this.funcionario.salario === undefined || this.funcionario.salario <= 0) {
      this.erros.salario = 'Informe um salário válido (maior que 0).';
      valido = false;
    }

    if (!this.funcionario.departamentoId || this.funcionario.departamentoId.trim() === '') {
      this.erros.departamentoId = 'Selecione um departamento.';
      valido = false;
    }

    return valido;
  }

  salvarFuncionario() {
    if (!this.validarCampos()) {
      return;
    }

    if (this.modoEdicao) {
      const id = this.funcionario.id!;
      this.funcionarioService.atualizar(id, this.funcionario).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Funcionário atualizado!',
          text: 'As informações foram salvas com sucesso.',
          confirmButtonColor: '#16a34a',
        }).then(() => {
          this.router.navigate(['/funcionarios']);
        });
      });
    } else {
      const novoFuncionario = { ...this.funcionario };
      delete (novoFuncionario as any).id;

      this.funcionarioService.criar(novoFuncionario).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Funcionário cadastrado!',
          text: 'O novo funcionário foi adicionado com sucesso.',
          confirmButtonColor: '#16a34a',
        }).then(() => {
          this.router.navigate(['/funcionarios']);
        });
      });
    }
  }

  voltar() {
    this.router.navigate(['/funcionarios']);
  }
}
