import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { Autor } from '../autores/autor.model';
import { AutoresService } from '../autores/autores.service';
import { BooksService } from '../books/books.service';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css'],
})
export class NewBookComponent implements OnInit, OnDestroy {
  selectAutor!: string;
  selectAutorLabel!: string;
  fechaPublicacion!: string;
  autores: Autor[] = [];
  autorSubscription!: Subscription;

  @ViewChild(MatDatepicker) picker!: MatDatepicker<Date>;

  constructor(
    private bookService: BooksService,
    private dialogRef: MatDialog,
    private autoresService: AutoresService
  ) {}

  ngOnInit(): void {
    this.autoresService.getAutors();
    this.autorSubscription = this.autoresService
      .getListener()
      .subscribe((autores: Autor[]) => {
        this.autores = autores;
      });
  }

  ngOnDestroy() {
    this.autorSubscription.unsubscribe();
  }

  saveBook(form: NgForm) {
    if (form.valid) {
      const autorRequest = {
        id: this.selectAutor,
        nombreCompleto: this.selectAutorLabel,
      };

      const libroRequest = {
        id: null,
        descripcion: form.value.descripcion,
        titulo: form.value.titulo,
        autor: autorRequest,
        precio: parseInt(form.value.precio),
        fechaPublicacion: new Date(this.fechaPublicacion),
      };

      this.bookService.addBook(libroRequest);
      this.autorSubscription = this.bookService.addListener().subscribe(() => {
        this.dialogRef.closeAll();
      });
    }
  }

  selected(event: MatSelectChange) {
    this.selectAutorLabel = (event.source.selected as MatOption).viewValue;
  }
}
