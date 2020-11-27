import { ProdutoService } from './produto.service';
import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  produtos: any[] = [];
  displayedColumns: string[] = ['codigo', 'nome', 'preco', 'star'];
  expandedElement: any | null;
  form: FormGroup;
  isEditing = false;

  dataSource = new MatTableDataSource(this.produtos);

  constructor(private produtoService: ProdutoService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      id: [''],
      nome: ['', Validators.required],
      codigo: ['', Validators.required],
      preco: ['', Validators.compose([Validators.required, Validators.min(0)])]
    });

    this.produtoService.getProdutos().subscribe(produtos => {
      this.produtos = produtos;
      this.dataSource = new MatTableDataSource(this.produtos);
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(element) {
    this.produtoService.removeProduto(element).subscribe(produtos => {
      this.produtos = produtos;
      this.dataSource = new MatTableDataSource(this.produtos);
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
    this.produtoService.editProduto(this.form.value).subscribe(produtos => {
      this.produtos = produtos;
      this.dataSource = new MatTableDataSource(this.produtos);
      this.isEditing = false;
    });
  }
}
