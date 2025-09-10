import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { ListaFuncionariosComponent } from '../lista-funcionarios/lista-funcionarios.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'cadastro', component: CadastroComponent },
  { path: '', redirectTo: '/cadastro', pathMatch: 'full' },
  { path: 'funcionarios', component: ListaFuncionariosComponent },
  { path: '', redirectTo: '/funcionarios', pathMatch: 'full' },
];
