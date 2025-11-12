import { Routes } from '@angular/router';
import { ListaFuncionariosComponent } from './components/lista-funcionarios/lista-funcionarios';
import { ListaDepartamentoComponent } from './components/lista-departamentos/lista-departamentos';
import { FormDepartamentosComponent } from './components/form-departamentos/form-departamentos';
import { FormFuncionariosComponent } from './components/form-funcionarios/form-funcionarios';

export const routes: Routes = [
  { path: '', redirectTo: 'funcionarios', pathMatch: 'full' },

  // Funcionários
  { path: 'funcionarios', component: ListaFuncionariosComponent },
  { path: 'funcionarios/novo', component: FormFuncionariosComponent },
  { path: 'funcionarios/editar/:id', component: FormFuncionariosComponent },

  // Departamentos
  { path: 'departamentos', component: ListaDepartamentoComponent },
  { path: 'departamentos/novo', component: FormDepartamentosComponent },
  { path: 'departamentos/editar/:id', component: FormDepartamentosComponent },
];
