import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { LibrosService } from '../services/libros.services';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  @Input() titleBook: string | undefined;

  constructor(private BooksService : BooksService) {}

  ngOnInit(): void {

  }

  @Output() libroClicked = new EventEmitter();
  onClicked() {
    this.BooksService.deleteLibro(this.titleBook)
  }
}
