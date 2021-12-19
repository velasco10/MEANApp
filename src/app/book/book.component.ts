import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { BooksListService } from '../services/booksList.services';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  @Input() titleBook!: string;

  constructor(private booksListService : BooksListService) {}

  ngOnInit(): void {

  }

  @Output() libroClicked = new EventEmitter();
  onClicked() {
    this.booksListService.deleteBook(this.titleBook)
  }
}
