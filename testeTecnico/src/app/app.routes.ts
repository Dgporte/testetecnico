import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { ListaFuncionariosComponent } from '../lista-funcionarios/lista-funcionarios.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent, canActivate: [AuthGuard] },
  {
    path: 'lista-funcionarios',
    component: ListaFuncionariosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'funcionarios',
    redirectTo: '/lista-funcionarios',
    pathMatch: 'full',
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
