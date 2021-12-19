import { Autor } from './autor.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AutorsService {
  baseUrl = environment.baseUrl;
  private autorsList: Autor[] = [];

  private autorsSubject = new Subject<Autor[]>();

  constructor(private http: HttpClient) {}
  getAutors() {
    this.http
      .get<Autor[]>(this.baseUrl + 'api/libreriaAutor')
      .subscribe((data) => {
        this.autorsList = data;
        this.autorsSubject.next([...this.autorsList]);
      });
  }

  getListener() {
    return this.autorsSubject.asObservable();
  }
}
