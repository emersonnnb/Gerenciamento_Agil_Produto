import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    MatButtonModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  title = 'GAP';
  opened = true;
  showSidebar = true;

  menuItems = [
    { nome: 'Dashboard', link: '/dashboard' },
    { nome: 'Produtos', link: '/produtos' },
    { nome: 'Usuários', link: '/usuarios' },
    { nome: 'Financeiro', link: '/financeiro' },
    { nome: 'Configurações', link: '/configuracoes' },
  ];

  constructor(private router: Router, private usuarioService: UsuarioService) {}

  ngOnInit(): void {
   
  }

  deslogar(){
    this.usuarioService.deslogar();
  }
  
  toggleSidenav() {
    this.opened = !this.opened;
  }

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
