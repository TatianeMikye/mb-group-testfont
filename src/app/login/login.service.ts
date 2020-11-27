import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  emailCorreto: any = 'admin@admin.com';
  senhaCorreta: any = 'senha';

  constructor() { }

  getLogin(dados: any): Observable<any> {
    console.log('aaa');
    return of(dados.email === this.emailCorreto && dados.senha === this.senhaCorreta);
  }
}
