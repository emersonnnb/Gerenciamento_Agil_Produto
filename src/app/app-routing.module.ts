import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { ProdutoComponent } from './features/produto/produto.component';
import { UserComponent } from './features/user/user.component';
import { VendaComponent } from './features/venda/venda.component';

const routes: Routes = [
  // { path: "", component: LoginComponent },
  { path: "produtos", component: ProdutoComponent },
  { path: "usuarios", component: UserComponent },
  { path: "vendas", component: VendaComponent },
  { path: "financeiro", component: VendaComponent },
  { path: "estoque", component: VendaComponent },
  { path: "configuracoes", component: VendaComponent },
  { path: "relatorios", component: VendaComponent },  
  { path: "dashboard", component: VendaComponent },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
