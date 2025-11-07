import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestorService } from '../../services/gestor-service';
import { DepartamentoService } from '../../services/departamento-services';
import { TipoGestor } from '../../models/tipo-gestor';
import { TipoDepartamento } from '../../models/tipo-departamento';

@Component({
  selector: 'app-lista-gestores',
  imports: [CommonModule],
  templateUrl: './lista-gestores.html',
  styleUrl: './lista-gestores.scss'
})
export class ListaGestoresComponent implements OnInit {
  gestores: WritableSignal<TipoGestor[]> = signal([]);
  departamentos: WritableSignal<TipoDepartamento[]> = signal([]);

  constructor(
    private gestorService: GestorService,
    private departamentoService: DepartamentoService
  ) {}

  ngOnInit(): void {
    this.carregarGestor();
    this.carregarDepartamentos();
  }

  carregarGestor(): void {
    this.gestorService.getGestor().subscribe({
      next: data => this.gestores.set(data),
      error: err => console.log(err)
    });
  }

  carregarDepartamentos(): void {
    this.departamentoService.getDepartamento().subscribe({
      next: data => this.departamentos.set(data),
      error: err => console.log(err)
    });
  }

  // 🔗 Método simples para buscar o nome do departamento
  getNomeDepartamento(departamentoId: string): string {
    return this.departamentos().find(dep => dep.id === departamentoId)?.departamento || '';
  }
}
