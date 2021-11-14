import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css'],
})
export class LibrosComponent implements OnInit {
  libros = ['Harry Potter', 'El señor de los anillos', 'El quijote'];

  constructor() {}

  ngOnInit(): void {}

  deleteBook(libro: string){
    this.libros = this.libros.filter(p=>p !== libro)
  }
}
