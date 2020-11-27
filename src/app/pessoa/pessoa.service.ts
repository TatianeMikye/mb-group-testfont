import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoas: any[] = [
    { id: 1, nome: 'Pessoa 1', cpf: '00094200592', dataNascimento: '1997-09-09' },
    { id: 2, nome: 'Pessoa 2', cpf: '00012312312', dataNascimento: '1997-03-03' }
  ];

  constructor() { }

  getPessoas(): Observable<any> {
    return of(this.pessoas);
  }

  savePessoa(pessoa: any): Observable<any> {
    console.log(this.pessoas);
    pessoa.id  = this.pessoas.map(a => a.id).sort()[0] + 1;
    this.pessoas.push(pessoa);
    return of(this.pessoas);
  }

  editPessoa(pessoa: any): Observable<any> {
    let index = this.pessoas.indexOf(this.pessoas.filter(a => pessoa.id === a.id)[0]);
    if(index < 0) {
      index = this.pessoas.length;
      pessoa = {...pessoa, id: index};
    }
    this.pessoas[index] = pessoa;
    return of(this.pessoas);
  }

  removePessoa(pessoa: any): Observable<any> {
    const index = this.pessoas.indexOf(this.pessoas.filter(a => pessoa.id === a.id)[0]);
    this.pessoas.splice(index, 1);

    return of(this.pessoas);
  }
 
}
