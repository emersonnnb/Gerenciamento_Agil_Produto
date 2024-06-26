import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { FormModeEnum } from 'src/app/core/Enum/form-mod.enum';
import { ProdutoModel } from 'src/app/core/model/produto.model';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-add-edit-produto',
  templateUrl: './add-edit-produto.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatRadioModule,
    MatSelectModule,
    CurrencyMaskModule,
    MatButtonModule,
  ],
  styleUrls: ['./add-edit-produto.component.scss'],
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
  subGrupoDomain: any = [];

  categoryList: any = [];
  grupoList: any = [];
  subGrupoList: any = [];

  imageSrc: string | ArrayBuffer | null = null;

  constructor(
    public dialogRef: MatDialogRef<AddEditProdutoComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private produtoService: ProdutoService,
  ) {}

  ngOnInit(): void {
    this.mode = this.data.mode;
    this.id = this.data.id;
    this.data = this.data.data;
    this.getProdutoId();
    this.getCategoryGrupoSubgrupo();
    this.buildForm();

    switch (this.mode) {
      case this.formModeEnum.Incluir:
        this.formProduto.enable();
        this.formProduto.controls['id'].disable();
        break;

      case this.formModeEnum.Visualizar:
        this.formProduto.disable();
        break;

      default:
        break;
    }
  }

  buildForm() {
    this.formProduto = this.fb.group({
      id: [null],
      codProduto: [null, Validators.maxLength(15)],
      descricaoResumida: [null, Validators.maxLength(20)],
      descricaoCompleta: [null, Validators.maxLength(40)],
      categoria: [null],
      grupo: [null],
      subGrupo: [null],
      situacao: [null],
      precoVenda: [null],
      precoCusto: [null],
      marginVenda: [null],
      unidadeMedida: [null],
      eanCode: [null],
      estoqueMinimo: [null],
      estoqueMaximo: [null],
      permitirDesconto: [null],
      descontoMaximo: [null],
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result; // Atualiza a fonte da imagem
      };
      reader.readAsDataURL(file);
    }
  }

  private getProdutoId(): void {
    this.produtoService
      .getIdProduto(this.id)
      .pipe()
      .subscribe({
        next: (response: ProdutoModel | any) => {
          this.formProduto.patchValue(response);
          if (this.mode === this.formModeEnum.Visualizar) {
            //this.formProduto.disable();
          }
        },
        error: (error) => {
          console.log(error);
          // this.dialogService.alert(error.error?.message || "Sistema indisponível no momento.")
          // this.resetValuesAddress();
        },
      });
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
  }

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
  }

  exit(): void {
    this.dialogRef.close();
  }
}
