import { Component, OnInit, OnDestroy } from '@angular/core';
import { BooksListService } from '../services/booksList.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-booksList',
  templateUrl: './booksList.component.html',
  styleUrls: ['./booksList.component.css'],
})
export class BooksListComponent implements OnInit {

  books = [];
  constructor(private booksListService:BooksListService) {}

  private bookSubscricion!: Subscription;

  ngOnInit(): void {
    this.books = this.booksListService.getBooks();
    this.bookSubscricion = this.booksListService.booksSubject.subscribe(()=>{
      this.books = this.booksListService.getBooks();
    })
  }

  deleteBook(libro: string){

  }

  saveBook(form:any){
    if(form.valid){
      this.booksListService.addBooks(form.value.nombreLibro)
    }
  }

  ngOnDestroy(){
    this.bookSubscricion.unsubscribe()
  }

}
