import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';

@Component({
  selector: 'app-menu-lista',
  templateUrl: './menu-lista.component.html',
  styleUrls: ['./menu-lista.component.css'],
})
export class MenuListaComponent implements OnInit,OnDestroy {
  estadoUsuario!: boolean;
  usuarioSubscription!: Subscription;

  constructor(private seguridadService: SeguridadService) {}

  ngOnInit(): void {
    this.usuarioSubscription = this.seguridadService.seguridadCambio.subscribe(
      (status) => {
        this.estadoUsuario = status;
      }
    );
  }

  ngOnDestroy(){
    this.usuarioSubscription.unsubscribe()
  }

  @Output() menuToggle = new EventEmitter();
  onCerrarLibro() {
    this.menuToggle.emit();
  }

  terminarSesionMenu() {
    this.onCerrarLibro();
    this.seguridadService.saliSesion();
  }
}
