import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { Autor } from '../autors/autor.model';
import { AutorsService } from '../autors/autors.service';
import { BooksService } from '../books/books.service';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css'],
})
export class NewBookComponent implements OnInit, OnDestroy {
  selectAutor!: string;
  selectAutorLabel!: string;
  publicationDate!: string;
  autors: Autor[] = [];
  autorSubscription!: Subscription;

  @ViewChild(MatDatepicker) picker!: MatDatepicker<Date>;

  constructor(
    private bookService: BooksService,
    private dialogRef: MatDialog,
    private autorsService: AutorsService
  ) {}

  ngOnInit(): void {
    this.autorsService.getAutors();
    this.autorSubscription = this.autorsService
      .getListener()
      .subscribe((autores: Autor[]) => {
        this.autors = autores;
      });
  }

  ngOnDestroy() {
    this.autorSubscription.unsubscribe();
  }

  saveBook(form: NgForm) {
    if (form.valid) {
      const autorRequest = {
        id: this.selectAutor,
        completeName: this.selectAutorLabel,
      };

      const bookRequest = {
        id: "",
        description: form.value.description,
        title: form.value.title,
        autor: autorRequest,
        price: parseInt(form.value.price),
        publicationDate: new Date(this.publicationDate),
      };

      this.bookService.addBook(bookRequest);
      this.autorSubscription = this.bookService.addListener().subscribe(() => {
        this.dialogRef.closeAll();
      });
    }
  }

  selected(event: MatSelectChange) {
    this.selectAutorLabel = (event.source.selected as MatOption).viewValue;
  }
}
