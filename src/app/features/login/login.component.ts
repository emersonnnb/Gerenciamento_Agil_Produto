import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { UsuarioModel } from 'src/app/core/model/usuario.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule, MatIconModule, RouterModule, MatButtonModule, MatSnackBarModule],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  hide = false;

  constructor(    
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required]],
    });
  }
  
  logar(){
    if (this.form.invalid) return;

    var usuario = this.form.getRawValue() as UsuarioModel;

    this.usuarioService.logar(usuario).subscribe((response) => {
        if(!response.sucesso){
          this.snackBar.open('Falha na autenticação', 'Usuário ou senha incorretos.', {
            duration: 3000
          });
        }
    })
  }

}
