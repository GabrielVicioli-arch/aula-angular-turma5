import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FuncionarioService } from '../../services/funcionario';
import { DepartamentoService } from '../../services/departamento';
import { TipoFuncionario } from '../../models/tipo-funcionario-module';
import { TipoDepartamento } from '../../models/tipo-departamento-module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-funcionarios',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './form-funcionarios.html',
  styleUrls: ['./form-funcionarios.scss']
})
export class FormFuncionariosComponent implements OnInit {

  form!: FormGroup; // formulário reativo
  departamentos: TipoDepartamento[] = [];
  modoEdicao: boolean = false;
  funcionarioId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private funcionarioService: FuncionarioService,
    private departamentoService: DepartamentoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Criando o formulário com validações
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cargo: ['', Validators.required],
      salario: [0, [Validators.required, Validators.min(1)]],
      departamentoId: ['', Validators.required],
    });

    // Carrega os departamentos
    this.departamentoService.listarDepartamentos().subscribe((dados) => {
      this.departamentos = dados;
    });

    // Verifica se é edição
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.modoEdicao = true;
      this.funcionarioId = idParam;
      this.funcionarioService.buscarPorId(idParam).subscribe((dados) => {
        this.form.patchValue(dados);
      });
    }
  }

  // Getters para facilitar no template
  get nome() {
    return this.form.get('nome');
  }

  get cargo() {
    return this.form.get('cargo');
  }

  get salario() {
    return this.form.get('salario');
  }

  get departamentoId() {
    return this.form.get('departamentoId');
  }

  salvarFuncionario() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // exibe os erros
      return;
    }

    const funcionario = this.form.value as TipoFuncionario;

    if (this.modoEdicao && this.funcionarioId) {
      this.funcionarioService.atualizar(this.funcionarioId, funcionario).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Funcionário atualizado!',
          text: 'As informações foram salvas com sucesso.',
          confirmButtonColor: '#16a34a',
        }).then(() => this.router.navigate(['/funcionarios']));
      });
    } else {
      this.funcionarioService.criar(funcionario).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Funcionário cadastrado!',
          text: 'O novo funcionário foi adicionado com sucesso.',
          confirmButtonColor: '#16a34a',
        }).then(() => this.router.navigate(['/funcionarios']));
      });
    }
  }

  voltar() {
    this.router.navigate(['/funcionarios']);
  }
}
