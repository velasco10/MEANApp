import { Subject } from "rxjs";

export class BooksListService {

  booksSubject= new Subject();
  private books = ['Libro1', 'Libro2', 'Libro3'];

  getBooks() {
    return [...this.books]; //devuelve lo que ya hay en el array mas lo que se haya añadido
  }

  addBooks(book: string) {
    this.books.push(book);
    this.booksSubject.next(book);
  }

  deleteBook(book:string){
    this.books = this.books.filter(p => p !== book)
    this.booksSubject.next(this.books);
  }

}
