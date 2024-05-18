import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatToolbarModule, MatMenuModule, MatSidenavModule, MatListModule, RouterModule, MatButtonModule  ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GAP';
  opened =  true;

  menuItems = [
    { nome: 'Dashboard', link: '/dashboard' },
    { nome: 'Produtos', link: '/produtos' },
    { nome: 'Usuários', link: '/usuarios' },
    { nome: 'Financeiro', link: '/financeiro' },
    //{ nome: 'Estoque', link: '/estoque' },
    { nome: 'Configurações', link: '/configuracoes' },
   // { nome: 'Relatórios', link: '/relatorios' },    
  ];

  getIcon(nome: string): string {
    switch (nome) {
      case 'Dashboard':
        return 'bar_chart_4_bars';
      case 'Produtos':
        return 'list';
      case 'Usuários':
        return 'group';
      case 'Financeiro':
        return 'attach_money';
      case 'Configurações':
        return 'settings';
      case 'Estoque':
        return 'inventory';
      case 'Relatórios':
        return 'insights';      
      default:
        return '';
    }
  }
  
}
