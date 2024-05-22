import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioAutenticadoGuard implements CanActivate{
    constructor(
      private usuarioService: UsuarioService,
      private router: Router) { }
    canActivate(){
      if (this.usuarioService.logado) {
        return true;
      }
      this.router.navigate(['login']);
      return false;
    }
}
//artigo usado para login e token
//https://balta.io/blog/login-logout-protecao-de-rotas-envio-de-tokens-com-angular