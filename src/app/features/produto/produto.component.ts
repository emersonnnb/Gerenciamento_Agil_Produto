import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { ListProdutoComponent } from './list-produto/list-produto.component';
import { EstoqueComponent } from './estoque/estoque.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  standalone: true,
  imports: [CommonModule, MatTabsModule, ListProdutoComponent, EstoqueComponent, RelatoriosComponent ],
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

  constructor(    
  ) { }

  ngOnInit(): void {

  }


}




