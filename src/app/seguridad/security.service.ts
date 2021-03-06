import { Subject } from 'rxjs';
import { User } from './user.model';
import { LoginData } from './login-data.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  private token!: string;
  baseUrl = environment.baseUrl;

  securityChange = new Subject<boolean>();
  private user: User | undefined;

  loadUser(): void {
    const tokenBrowser = localStorage.getItem('token');
    if (!tokenBrowser) {
      return;
    }

    this.token = tokenBrowser;
    this.securityChange.next(true);

    this.http.get<User>(this.baseUrl + 'user').subscribe((response) => {
      console.log('login respuesta', response);
      this.token = response.token;
      this.user = {
        email: response.email,
        name: response.name,
        surname: response.surname,
        token: response.token,
        password: '',
        username: response.username,
        userId: response.userId,
      };
      this.securityChange.next(true);
      localStorage.setItem('token', response.token);
    });
  }

  getToken(): string {
    return this.token;
  }
  constructor(private router: Router, private http: HttpClient) {}

  userRegister(usr: User): void {
    this.http
      .post<User>(this.baseUrl + 'user/registrar', usr)
      .subscribe((response) => {
        this.token = response.token;
        this.user = {
          email: response.email,
          name: response.name,
          surname: response.surname,
          token: response.token,
          password: '',
          username: response.username,
          userId: response.userId,
        };
        this.securityChange.next(true);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/']);
      });
  }

  login(loginData: LoginData): void {
    this.http
      .post<User>(this.baseUrl + 'user/login', loginData)
      .subscribe((response) => {
        console.log('login respuesta', response);
        this.token = response.token;
        this.user = {
          email: response.email,
          name: response.name,
          surname: response.surname,
          token: response.token,
          password: '',
          username: response.username,
          userId: response.userId,
        };
        this.securityChange.next(true);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/']);
      });
  }

  closeSession() {
    this.user = undefined;
    this.securityChange.next(false);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getUser() {
    return { ...this.user };
  }

  onSession() {
    return this.token != null;
  }
}
