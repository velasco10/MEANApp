import { Subject } from "rxjs";

export class LibrosService {

  librosSubject= new Subject();
  private libros = ['Libro1', 'Libro2', 'Libro3'];

  getLibros() {
    return [...this.libros]; //devuelve lo que ya hay en el array mas lo que se haya añadido
  }

  addLibros(libro: string) {
    this.libros.push(libro);
    this.librosSubject.next(libro);
  }

  deleteLibro(libro:string){
    this.libros = this.libros.filter(p => p !== libro)
    this.librosSubject.next(this.libros);
  }

}
