import { AppDateAdapter, APP_DATE_FORMATS } from './date-format';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter,  MAT_DATE_FORMATS } from '@angular/material/core';


import { MatTableDataSource } from '@angular/material/table';
import { PessoaService } from './pessoa.service';


@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class PessoaComponent implements OnInit {


  pessoas: any[] = [];
  displayedColumns: string[] = ['codigo', 'nome', 'preco', 'star'];
  expandedElement: any | null;
  form: FormGroup;
  isEditing = false;

  dataSource = new MatTableDataSource(this.pessoas);

  constructor(private pessoaService: PessoaService, private _formBuilder: FormBuilder, private _adapter: DateAdapter<any>) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      id: [''],
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      dataNascimento: ['', Validators.required]
    });

    this._adapter.setLocale('br');

    this.pessoaService.getPessoas().subscribe(pessoas => {
      this.pessoas = pessoas;
      this.dataSource = new MatTableDataSource(this.pessoas);
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(element) {
    this.pessoaService.removePessoa(element).subscribe(pessoas => {
      this.pessoas = pessoas;
      this.dataSource = new MatTableDataSource(this.pessoas);
    });
  }

  edit(element) {
    this.isEditing = true;
    this.form.reset(element);
  }

  onCancel() {
    this.isEditing = false;
  }

  onNew() {
    this.isEditing = true;
  }

  onSave() {
    this.pessoaService.editPessoa(this.form.value).subscribe(pessoas => {
      this.pessoas = pessoas;
      this.dataSource = new MatTableDataSource(this.pessoas);
      this.isEditing = false;
    });
  }

}
