import { Autor } from './autor.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AutoresService {
  baseUrl = environment.baseUrl;
  private autoresLista: Autor[] = [];
  /*private autoresLista: Autor[]= [
    {autorId:1,nombre:'Daniel', apellido:"velasco", gradoAcademico:"Data Engineer"},
    {autorId:2,nombre:'Yuri', apellido:"Frezzato", gradoAcademico:"sys admin"},
    {autorId:3,nombre:'Miguel', apellido:"Vadillo", gradoAcademico:"Enfermero"},
    {autorId:4,nombre:'Sergio', apellido:"Vinagre", gradoAcademico:"Ingeniero Quimico"},
  ]*/

  private autoresSubject = new Subject<Autor[]>();

  constructor(private http: HttpClient) {}
  getAutors() {
    this.http
      .get<Autor[]>(this.baseUrl + 'api/libreriaAutor')
      .subscribe((data) => {
        this.autoresLista = data;
        this.autoresSubject.next([...this.autoresLista]);
      });
  }

  getListener() {
    return this.autoresSubject.asObservable();
  }
}
