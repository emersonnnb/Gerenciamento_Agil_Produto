import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { UsuarioModel } from 'src/app/core/model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }
  
  private mockUsuarioLogin(usuario: UsuarioModel): Observable<any> {
    var retornoMock: any = [];
    if(usuario.email === "admin@admin.com" && usuario.senha == "123456"){
      retornoMock.sucesso = true;
      retornoMock.usuario = usuario;
      retornoMock.token = "TokenQueSeriaGeradoPelaAPI";
      return of(retornoMock);
    }
    retornoMock.sucesso = false;
    retornoMock.usuario = usuario;
    return of(retornoMock);
  }

  logar(usuario: UsuarioModel) : Observable<any> {
    /*return this.httpClient.post<any>(apiUrlUsuario + "/login", usuario).pipe(
      tap((resposta) => {
        if(!resposta.sucesso) return;
        localStorage.setItem('token', btoa(JSON.stringify(resposta['token'])));
        localStorage.setItem('usuario', btoa(JSON.stringify(resposta['usuario'])));
        this.router.navigate(['']);
      }));*/
      return this.mockUsuarioLogin(usuario).pipe(tap((resposta) => {
        if(!resposta.sucesso) return;
        localStorage.setItem('token', btoa(JSON.stringify("TokenQueSeriaGeradoPelaAPI")));
        localStorage.setItem('usuario', btoa(JSON.stringify(usuario)));
        this.router.navigate(['']);
      }));
  }

  deslogar() {
      localStorage.clear();
      this.router.navigate(['login']);
  }

  get obterUsuarioLogado(): UsuarioModel | null {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      return JSON.parse(atob(usuario)) as UsuarioModel;
    }
    return null;
  }
  
  get obterIdUsuarioLogado(): string | null {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      const decodificado = atob(usuario);
      const usuarioObj = JSON.parse(decodificado) as UsuarioModel;
      return usuarioObj.id;
    }
    return null;
  }
  
  get obterTokenUsuario(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      return JSON.parse(atob(token));
    }
    return null;
  }
  
  get logado(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
}
