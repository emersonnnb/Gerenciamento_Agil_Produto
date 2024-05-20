import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
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
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showSidebar = !(
          event.urlAfterRedirects.endsWith('/login') ||
          event.urlAfterRedirects === '/'
        );
      }
    });
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
