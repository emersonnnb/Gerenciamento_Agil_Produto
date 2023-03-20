import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {
  data = [
    { id: 1, name: "Mamão", category: "Frutas", price: 2.50, situation: "Ativo" },
    { id: 2, name: "Manga", category: "Frutas", price: 3.99, situation: "Inativo" },
    { id: 3, name: "Manga", category: "Frutas", price: 3.99, situation: "Inativo" },
    { id: 4, name: "Manga", category: "Frutas", price: 3.99, situation: "Inativo" },
    { id: 5, name: "Manga", category: "Frutas", price: 3.99, situation: "Inativo" },
    { id: 6, name: "Mamão", category: "Frutas", price: 2.50, situation: "Ativo" },
    { id: 7, name: "Manga", category: "Frutas", price: 3.99, situation: "Inativo" },
    { id: 8, name: "Manga", category: "Frutas", price: 3.99, situation: "Inativo" },
    { id: 9, name: "Manga", category: "Frutas", price: 3.99, situation: "Inativo" },
    { id: 10, name: "Manga", category: "Frutas", price: 3.99, situation: "Inativo" },
    { id: 11, name: "Mamão", category: "Frutas", price: 2.50, situation: "Ativo" },
    { id: 12, name: "Manga", category: "Frutas", price: 3.99, situation: "Inativo" },
    { id: 13, name: "Manga", category: "Frutas", price: 3.99, situation: "Inativo" },
    { id: 14, name: "Manga", category: "Frutas", price: 3.99, situation: "Inativo" },
    { id: 15, name: "Manga", category: "Frutas", price: 3.99, situation: "Inativo" },
  ];

  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  public displayedColumns: string[] = [
    "id",
    "name",
    "category",
    "situation",
    "price",
    "actions"
  ];

  pageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 5,
    length: 0,
  };


  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<ColumnsHeader>(this.data);
  }

}

export interface ColumnsHeader {
  id: number
  name: string;
  category: string;
  price: number;
  situation: string;
}
