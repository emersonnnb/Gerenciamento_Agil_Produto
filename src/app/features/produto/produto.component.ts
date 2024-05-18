import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { ListProdutoComponent } from './list-produto/list-produto.component';
import { AddEditProdutoComponent } from './add-edit-produto/add-edit-produto.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  standalone: true,
  imports: [CommonModule, MatTabsModule, ListProdutoComponent, AddEditProdutoComponent ],
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

  constructor(    
  ) { }

  ngOnInit(): void {

  }


}




