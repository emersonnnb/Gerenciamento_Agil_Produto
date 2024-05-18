
import { Routes } from '@angular/router';
import { ProdutoComponent } from './features/produto/produto.component';
import { UserComponent } from './features/usuario/user.component';
import { VendaComponent } from './features/venda/venda.component';

export const routes: Routes = [
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