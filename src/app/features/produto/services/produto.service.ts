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
    return this.httpClient.get(`${environment.apiUrl}`, { params });
  }

  public postProduto(data: ProdutoModel): Observable<unknown> {
    return this.httpClient.post<any>(`${environment.apiUrl}`, data);
  };

  public deletProduto(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/${id}`)
  };
}

