import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { ListaFuncionariosComponent } from '../lista-funcionarios/lista-funcionarios.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'lista-funcionarios', component: ListaFuncionariosComponent },
  {
    path: 'funcionarios',
    redirectTo: '/lista-funcionarios',
    pathMatch: 'full',
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
