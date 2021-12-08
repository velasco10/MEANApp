import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css'],
})
export class RegistrarComponent implements OnInit {
  constructor(private seguridadService: SeguridadService) {}

  ngOnInit(): void {}

  registrarUsuario(usuario: NgForm) {
    console.log(usuario)
    this.seguridadService.registrarUsuario({
      email:usuario.value.email,
      nombre:usuario.value.nombre,
      password:usuario.value.password,
      username:usuario.value.username,
      apellido:usuario.value.apellido,
      usuarioId:'',
      token:''
    })
  }
}
