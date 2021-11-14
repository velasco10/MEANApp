import { Component } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
})
export class UsuarioComponent {

  usuarios = ["Dani", "Lucia", "Yuri"];

  usuarioNombre = '';
  visible = false;

  constructor(){
    setTimeout(()=>{
      this.visible = true
    },3000)
  }

  onAgregarUsuarios(){
    this.usuarios.push(this.usuarioNombre)
  }

}
