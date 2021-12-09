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
