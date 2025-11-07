import { Routes } from '@angular/router';
import { ListaVagasComponents } from './components/lista-vagas-components/lista-vagas-components';
import { FormVagas } from './components/form-vagas/form-vagas';
import { ListaGestoresComponent } from './components/lista-gestores/lista-gestores';

export const routes: Routes = [
    { path: '', component: ListaVagasComponents },
    { path: 'form-vagas', component: FormVagas },
    { path: 'lista-gestores', component: ListaGestoresComponent}
];