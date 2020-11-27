import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';

import { LoginService } from './login.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  matcher = new MyErrorStateMatcher();
  showError = false;

  constructor(private _formBuilder: FormBuilder, public loginService: LoginService, private _router: Router) {}

  ngOnInit() {
    this.form = this._formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.required]
    });

    this.form.valueChanges.subscribe(a => this.showError = false);
  }

  onLogar() {
    this.loginService.getLogin(this.form.value).subscribe(result => {
      console.log(result);
      if(result) {
        this._router.navigate(['/home']);
      } else {
        this.showError = true;
      }
    });
  }

}
