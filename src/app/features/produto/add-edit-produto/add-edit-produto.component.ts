import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { FormModeEnum } from 'src/app/core/Enum/form-mod.enum';
import { ProdutoModel } from 'src/app/core/model/produto.model';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-add-edit-produto',
  templateUrl: './add-edit-produto.component.html',
  styleUrls: ['./add-edit-produto.component.scss']
})
export class AddEditProdutoComponent implements OnInit {

  formProduto!: FormGroup;
  typeForm!: string;
  formModeEnum = FormModeEnum;
  mode!: FormModeEnum;
  id!: number;

  constructor(
    public dialogRef: MatDialogRef<AddEditProdutoComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private produtoService: ProdutoService,

  ) { }

  ngOnInit(): void {
    console.log(this.data);

    this.mode = this.data.mode;
    this.id = this.data.id;
    this.data = this.data.data;

    this.formProduto = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      situation: [true, Validators.required],
    });

    switch (this.mode) {
      case this.formModeEnum.Incluir:
        this.formProduto.enable();
        //this.formProduto.controls.situation?.disable();
        break;

      case this.formModeEnum.Visualizar:
        this.formProduto.disable();
        //this.formProduto.controls.situation?.disable();
        this.fillForm(this.data);
        break;

      case this.formModeEnum.Editar:
        this.formProduto.enable();
        this.fillForm(this.data);
        break;

      default:
        break;
    }
  }

  fillForm(data: any) {
    this.formProduto.patchValue({
      id: data.id,
      description: data.description,
      isActive: data.isActive,
    });
  }

  editProduto() {
    this.mode = this.formModeEnum.Editar;
    this.formProduto.enable();
  }

  addProduto() {
    const values = this.formProduto.getRawValue() as ProdutoModel;
    if (values.name !== null) {
      values.name = values.name.trim();
    } else {
      values.situation = values.situation;
    }
    values.situation = values.situation;
    delete values?.situation;

    if (this.formProduto.invalid || values.name === '') {
      this.formProduto.markAllAsTouched();
      return;
    }

    this.produtoService.postProduto(values).subscribe({
      next: () => {
        this.formProduto.reset();
        this.dialogRef.close();
      },
      error: (error) => {
        //this.dialogService.alert(error.error?.message);
      },
    });
  };

  exit(): void {
    this.dialogRef.close();
  };

}
