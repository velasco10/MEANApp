import { Component, OnInit, OnDestroy } from '@angular/core';
import { LibrosService } from '../services/libros.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css'],
})
export class LibrosComponent implements OnInit {

  libros = [];
  constructor(private librosService:LibrosService) {}

  private libroSubscricion: Subscription | undefined;

  ngOnInit(): void {
    this.libros = this.librosService.getLibros();
    this.libroSubscricion = this.librosService.librosSubject.subscribe(()=>{
      this.libros = this.librosService.getLibros();
    })
  }

  deleteBook(libro: string){

  }

  guardarLibro(form:any){
    if(form.valid){
      this.librosService.addLibros(form.value.nombreLibro)
    }
  }

  ngOnDestroy(){
    this.libroSubscricion.unsubscribe()
  }

}
