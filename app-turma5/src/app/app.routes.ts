import { Routes } from '@angular/router';
import { ListaVagasComponents } from './components/lista-vagas-components/lista-vagas-components';
import { FormVagasComponent} from './components/form-vagas/form-vagas';
import { ListaGestoresComponent } from './components/lista-gestores/lista-gestores';
import { ListaDepartamentos } from './components/lista-departamentos/lista-departamentos';

export const routes: Routes = [
    { path: '', component: ListaVagasComponents },
    { path: 'lista-gestores', component: ListaGestoresComponent},
    { path: 'lista-departamento', component: ListaDepartamentos },
    { path: 'nova-vaga', component: FormVagasComponent },
    { path: 'editar-vaga/:id', component: FormVagasComponent }
];