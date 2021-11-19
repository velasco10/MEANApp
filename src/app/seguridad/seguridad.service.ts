import { Subject } from 'rxjs';
import { Usuario } from './usuario.model';
import { LoginData } from './login-data.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class SeguridadService {
  seguridadCambio = new Subject<boolean>();
  private usuario: Usuario | undefined;

  constructor(private router:Router){

  }

  registrarUusario(usr: Usuario) {
    this.usuario = {
      email: usr.email,
      usuarioId: Math.round(Math.random() * 10000).toString(),
      nombre: usr.nombre,
      apellidos: usr.apellidos,
      username: usr.username,
      password: '',
    };

    this.seguridadCambio.next(true);
    this.router.navigate(['/']);
  }

  login(LoginData: LoginData) {
    this.usuario = {
      email: LoginData.email,
      usuarioId: Math.round(Math.random() * 10000).toString(),
      nombre: '',
      apellidos: '',
      username: '',
      password: '',
    };
    this.seguridadCambio.next(true);
    this.router.navigate(['/']);
  }

  saliSesion() {
    this.usuario = undefined;
    this.seguridadCambio.next(false);
    this.router.navigate(['/login']);
  }

  obtenerUsuario() {
    return { ...this.usuario };
  }

  onSesion(){
    return this.usuario != null;
  }

}
