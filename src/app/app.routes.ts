import { Routes } from '@angular/router';
import { ProdutoComponent } from './features/produto/produto.component';
import { UserComponent } from './features/usuario/user.component';
import { VendaComponent } from './features/venda/venda.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { FinanceiroComponent } from './features/financeiro/financeiro.component';
import { ConfiguracoesComponent } from './features/configuracoes/configuracoes.component';
import { LoginComponent } from './features/login/login.component';
import { MainComponent } from './features/main/main.component';
import { UsuarioNaoAutenticadoGuard } from './services/guards/usuario-nao-autenticado.guard';
import { UsuarioAutenticadoGuard } from './services/guards/usuario-autenticado.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [UsuarioNaoAutenticadoGuard],
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [UsuarioAutenticadoGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'produtos', component: ProdutoComponent },
      { path: 'usuarios', component: UserComponent },
      { path: 'vendas', component: VendaComponent },
      { path: 'financeiro', component: FinanceiroComponent },
      { path: 'configuracoes', component: ConfiguracoesComponent },
    ],
  },
];
