import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Books } from './books.model';
import { HttpClient } from '@angular/common/http';
import { PaginationBooks } from './pagination-books.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  baseUrl = environment.baseUrl;
  private booksList: Books[] = [];

  bookSubject = new Subject();
  bookPagination!: PaginationBooks;
  bookPaginationSubject = new Subject<PaginationBooks>();
  constructor(private http: HttpClient) {}

  getBooks(
    booksByPage: number,
    actualPage: number,
    sort: string,
    sortDirection: string,
    filterValue: any
  ): void {
    const request = {
      pageSize: booksByPage,
      page: actualPage,
      sort,
      sortDirection,
      filterValue,
    };
    this.http
      .post<PaginationBooks>(this.baseUrl + 'api/libro/pagination', request)
      .subscribe((response) => {
        this.bookPagination = response;
        this.bookPaginationSubject.next(this.bookPagination);
      });
  }

  addBook(book: Books) {
    this.http.post(this.baseUrl + 'api/libro', book).subscribe((response) => {
      this.bookSubject.next(book);
    });
  }

  addListener(): any {
    return this.bookSubject.asObservable();
  }

  getListener(): any {
    return this.bookPaginationSubject.asObservable();
  }
}
