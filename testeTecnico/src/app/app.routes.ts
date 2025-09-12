import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('../login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'cadastro',
    loadComponent: () =>
      import('../cadastro/cadastro.component').then((m) => m.CadastroComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'lista-funcionarios',
    loadComponent: () =>
      import('../lista-funcionarios/lista-funcionarios.component').then(
        (m) => m.ListaFuncionariosComponent
      ),
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
