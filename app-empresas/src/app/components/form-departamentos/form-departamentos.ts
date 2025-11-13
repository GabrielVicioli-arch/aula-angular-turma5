import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DepartamentoService } from '../../services/departamento';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-departamentos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './form-departamentos.html',
  styleUrls: ['./form-departamentos.scss']
})
export class FormDepartamentosComponent implements OnInit {

  form!: FormGroup;
  id: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private departamentoService: DepartamentoService
  ) {}

  ngOnInit() {
    // ✅ Criação do formulário reativo com validações
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      local: ['', [Validators.required, Validators.minLength(2)]],
    });

    // Se for edição, carrega o departamento
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.carregarDepartamento(this.id);
    }
  }

  carregarDepartamento(id: string) {
    this.departamentoService.buscarPorId(id).subscribe({
      next: (dados) => {
        this.form.patchValue(dados); // ✅ preenche o form automaticamente
      },
      error: (erro) => {
        console.error('Erro ao carregar departamento:', erro);
        Swal.fire('Erro', 'Erro ao carregar o departamento.', 'error');
      }
    });
  }

  salvar() {
    if (this.form.invalid) {
      // Marca todos os campos como "tocados" para exibir as mensagens
      this.form.markAllAsTouched();
      return;
    }

    const dados = this.form.value;

    if (this.id) {
      this.departamentoService.atualizar(this.id, dados).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Departamento atualizado!',
            text: 'As informações foram salvas com sucesso.',
            confirmButtonColor: '#16a34a',
          }).then(() => this.router.navigate(['/departamentos']));
        },
        error: () => Swal.fire('Erro', 'Erro ao atualizar o departamento.', 'error')
      });
    } else {
      this.departamentoService.cadastrar(dados).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Departamento criado!',
            text: 'O novo departamento foi adicionado com sucesso.',
            confirmButtonColor: '#16a34a',
          }).then(() => this.router.navigate(['/departamentos']));
        },
        error: () => Swal.fire('Erro', 'Erro ao criar o departamento.', 'error')
      });
    }
  }

  voltar() {
    this.router.navigate(['/departamentos']);
  }

  // ✅ Facilita o acesso no HTML
  get nome() {
    return this.form.get('nome');
  }

  get local() {
    return this.form.get('local');
  }
}
