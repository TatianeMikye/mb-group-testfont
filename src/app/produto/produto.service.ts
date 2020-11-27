import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  produtos = [
    { id: 1, nome: 'produto 1', codigo: 312, preco: 10.33 },
    { id: 2, nome: 'produto 2', codigo: 11, preco: 100.23 }
  ];

  constructor() { }

  getProdutos(): Observable<any> {
    return of(this.produtos);
  }

  saveProduto(produto: any): Observable<any> {
    console.log(this.produtos);
    produto.id  = this.produtos.map(a => a.id).sort()[0] + 1;
    this.produtos.push(produto);
    return of(this.produtos);
  }

  editProduto(produto: any): Observable<any> {
    let index = this.produtos.indexOf(this.produtos.filter(a => produto.id === a.id)[0]);
    if(index < 0) {
      index = this.produtos.length;
      produto = {...produto, id: index};
    }
    this.produtos[index] = produto;
    return of(this.produtos);
  }

  removeProduto(produto: any): Observable<any> {
    const index = this.produtos.indexOf(this.produtos.filter(a => produto.id === a.id)[0]);
    this.produtos.splice(index, 1);

    return of(this.produtos);
  }
  
}
