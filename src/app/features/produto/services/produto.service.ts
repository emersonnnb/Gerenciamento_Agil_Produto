import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProdutoModel } from 'src/app/core/model/produto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllProduto(params: HttpParams): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/produtos/`, { params });
  }

  public getIdProduto(id: number): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/produtos/${id}`);
  };

  public getAllCategoria(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/categorias/`);
  }
  public getAllGrupo(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/grupos/`);
  }
  public getAllSubGrupo(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/subGrupos/`);
  }

  public postProduto(payload: ProdutoModel): Observable<ProdutoModel> {
    return this.httpClient.post<ProdutoModel>(`${environment.apiUrl}/produtos`, payload);
  };

  public deleteProduto(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/produtos/${id}`)
  };
}

