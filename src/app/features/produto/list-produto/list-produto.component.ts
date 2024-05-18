import { HttpClientModule, HttpParams } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormModeEnum } from 'src/app/core/Enum/form-mod.enum';
import { ProdutoModel } from 'src/app/core/model/produto.model';
import { AddEditProdutoComponent } from '../add-edit-produto/add-edit-produto.component';
import { ProdutoService } from '../services/produto.service';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-list-produto',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatIconModule, MatSlideToggleModule, MatTooltipModule, HttpClientModule],
  templateUrl: './list-produto.component.html',
  styleUrl: './list-produto.component.scss',  

})
export class ListProdutoComponent {

  public menuIndex: number | undefined = undefined;
  public labelAcaoAtualtemListaMenu: string = '';

  dataSourceProduto!: MatTableDataSource<ProdutoModel>

  public displayedColumns: string[] = [
    "id",
    "name",
    "category",
    "situation",
    "salePrice",
    "actions"
  ];
  formModeEnum = FormModeEnum;

  pageOrder = 'ASC';
  pageSort = 'c.description';
  pageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 5,
    length: 0,
  };
  searchString!: string;
  searchFieldString!: string | null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private api: ProdutoService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getProduto(this.pageEvent);
  }

  getProduto(event: PageEvent) {
    this.pageEvent = event;
    let params = new HttpParams()
    this.api.getAllProduto(params).subscribe({
      next: (res): void => {
        this.pageEvent.length = res.totalRecords;
        this.dataSourceProduto = new MatTableDataSource(res);
        this.dataSourceProduto.sort = this.sort;
      },
      error: (error) => {
        //this.dialogService.alert(error.error?.message);
      }
    });
  };

  deleteProduto(produtoId: number) {
    this.api.deleteProduto(produtoId).subscribe({
      next: () => {
        this.getProduto(this.pageEvent);
      },
      error: (error) => {
        // this.dialogService.alert(error.error?.message || "Sistema indisponível no momento.")
      }
    })
  };


  openDialogProduto(id: number | null, mode: string) {
    return this.dialog.open(AddEditProdutoComponent, {
      minWidth: "90%",
      height: "90vh",
      data: { id, mode }
    }).afterClosed().subscribe(() => {
      this.getProduto(this.pageEvent)
    })
  };

  situationTextMap: Map<string, string> = new Map([
    ["false", "Inativo"],
    ["true", "Ativo"],
  ]);
}
