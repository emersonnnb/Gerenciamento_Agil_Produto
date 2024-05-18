import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormModeEnum } from 'src/app/core/Enum/form-mod.enum';
import { ProdutoModel } from 'src/app/core/model/produto.model';
import { ProdutoService } from '../services/produto.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { CurrencyMaskModule } from "ng2-currency-mask";

@Component({
  selector: 'app-add-edit-produto',
  templateUrl: './add-edit-produto.component.html',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatInputModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule, MatTabsModule, MatRadioModule, MatSelectModule, CurrencyMaskModule],
  styleUrls: ['./add-edit-produto.component.scss']
})
export class AddEditProdutoComponent implements OnInit {

  formProduto!: FormGroup;
  typeForm!: string;
  formModeEnum = FormModeEnum;
  mode!: FormModeEnum;
  id!: number;
  selected = 'option';

  unitOfMeasurement: any = [];
  categoryDomain: any = [];
  grupoDomain: any = [];
  subGrupoDomain: any = []

  categoryList: any = [];
  grupoList: any = [];
  subGrupoList: any = [];

  constructor(
    public dialogRef: MatDialogRef<AddEditProdutoComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private produtoService: ProdutoService,

  ) { }

  ngOnInit(): void {

    this.mode = this.data.mode;
    this.id = this.data.id;
    this.data = this.data.data;
    this.getProdutoId();
    this.getCategoryGrupoSubgrupo();

    this.formProduto = this.fb.group({
      id: [null],
      descricaoResumida: [null],
      descricaoCompleta: [null],
      category: [null],
      group: [null],
      subGroup: [null],
      situation: [null],
      salePrice: [null],
      costPrice: [null],
      margin: [null],
      unitOfMeasurement: [null],
      eanCode: [null]
    });

    switch (this.mode) {
      case this.formModeEnum.Incluir:
        this.formProduto.enable();
        this.formProduto.controls['id'].disable();
        break;

      case this.formModeEnum.Visualizar:
        this.formProduto.disable();
        //this.formProduto.controls.situation?.disable();
        //this.fillForm(this.data);
        break;

      case this.formModeEnum.Editar:
        //this.formProduto.enable();
        //this.fillForm(this.data);
        break;

      default:
        break;
    }
  }

  private getProdutoId(): void {
    this.produtoService.getIdProduto(this.id)
      .pipe().subscribe({
        next: (response: ProdutoModel | any) => {
          this.formProduto.patchValue(response);
          if (this.mode === this.formModeEnum.Visualizar) {
            //this.formProduto.disable();
          }
        },
        error: (error) => {
          console.log(error)
          // this.dialogService.alert(error.error?.message || "Sistema indisponível no momento.")
          // this.resetValuesAddress();
        }
      })
  }

  editProduto() {
    this.mode = this.formModeEnum.Editar;
    this.formProduto.enable();
  }


  addProduto() {

    const formvalues = this.formProduto.getRawValue() as ProdutoModel;

    // if (values.descricaoResumida !== null) {
    //   values.descricaoResumida = values.descricaoResumida.trim();
    // } else {
    //   values.situation = values.situation;
    // }
    // values.situation = values.situation;
    // delete values?.situation;

    // if (this.formProduto.invalid || values.descricaoResumida === '') {
    //   this.formProduto.markAllAsTouched();
    //   return;
    // }
    console.log(formvalues);

    this.produtoService.postProduto(formvalues).subscribe({
      next: () => {
        this.formProduto.reset();
        this.dialogRef.close();
      },
      error: (error) => {
        //this.dialogService.alert(error.error?.message);
      },
    });
  };

  getCategoryGrupoSubgrupo(): void {
    this.produtoService.getAllCategoria().subscribe((data) => {
      this.categoryDomain = data;
      this.categoryList = this.categoryDomain.slice();
    });

    this.produtoService.getAllGrupo().subscribe((data) => {
      this.grupoDomain = data;
      this.grupoList = this.grupoDomain.slice();
    });
    this.produtoService.getAllSubGrupo().subscribe((data) => {
      this.subGrupoDomain = data;
      this.subGrupoList = this.subGrupoDomain.slice();
    });

  };

  exit(): void {
    this.dialogRef.close();
  };

}
