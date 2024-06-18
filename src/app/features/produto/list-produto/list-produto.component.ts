import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpParams } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormModeEnum } from 'src/app/core/Enum/form-mod.enum';
import { ProdutoModel } from 'src/app/core/model/produto.model';
import { AddEditProdutoComponent } from '../add-edit-produto/add-edit-produto.component';
import { ProdutoService } from '../services/produto.service';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-list-produto',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatTooltipModule,
    HttpClientModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './list-produto.component.html',
  styleUrl: './list-produto.component.scss',
})
export class ListProdutoComponent {
  public menuIndex: number | undefined = undefined;
  public labelAcaoAtualtemListaMenu: string = '';

  form!: FormGroup;

  dataSourceProduto!: MatTableDataSource<ProdutoModel>;

  public displayedColumns: string[] = [
    'id',
    'name',
    'categoria',
    'situacao',
    'precoVenda',
    'actions',
  ];

  searchByOptions: string[] = ['Código', 'Descrição', 'Categoria'];
  categoriaOptions: string[] = ['Categoria A', 'Categoria B', 'Categoria C'];

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
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.bulidForm();
    this.getProduto(this.pageEvent);
  }

  bulidForm() {
    this.form = this.fb.group({
      searchBy: [null, Validators.required],
      searchType: [null, Validators.required],
    });
  }

  onSearchByChange() {
    this.form.get('searchType')?.reset();
  }

  getProduto(event: PageEvent) {
    this.pageEvent = event;
    let params = new HttpParams();
    this.api.getAllProduto(params).subscribe({
      next: (res): void => {
        this.pageEvent.length = res.totalRecords;
        this.dataSourceProduto = new MatTableDataSource(res);
        this.dataSourceProduto.sort = this.sort;
      },
      error: (error) => {
        //this.dialogService.alert(error.error?.message);
      },
    });
  }

  deleteProduto(produtoId: number) {
    this.api.deleteProduto(produtoId).subscribe({
      next: () => {
        this.getProduto(this.pageEvent);
      },
      error: (error) => {
        // this.dialogService.alert(error.error?.message || "Sistema indisponível no momento.")
      },
    });
  }

  clearSearchType() {
    this.form.get('searchType')?.setValue('');
  }

  openDialogProduto(id: number | null, mode: string) {
    return this.dialog
      .open(AddEditProdutoComponent, {
        minWidth: '90%',
        height: '80vh',
        data: { id, mode },
      })
      .afterClosed()
      .subscribe(() => {
        this.getProduto(this.pageEvent);
      });
  }

  situationTextMap: Map<string, string> = new Map([
    ['false', 'Inativo'],
    ['true', 'Ativo'],
  ]);
}
