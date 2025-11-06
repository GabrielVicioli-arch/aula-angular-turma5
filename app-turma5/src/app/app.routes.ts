import { Routes } from '@angular/router';
import { ListaVagasComponents } from './components/lista-vagas-components/lista-vagas-components';
import { FormVagas } from './components/form-vagas/form-vagas';

export const routes: Routes = [
    { path: '', component: ListaVagasComponents },
    { path: 'form-vagas', component: FormVagas }
];
