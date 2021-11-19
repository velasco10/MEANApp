import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css'],
})
export class BarraComponent implements OnInit, OnDestroy {
  usuarioSubscripcion!: Subscription;
  estadoUsuario!: boolean;
  constructor(private seguridadServicio: SeguridadService) {}

  ngOnInit(): void {
    this.usuarioSubscripcion = this.seguridadServicio.seguridadCambio.subscribe(
      (status) => {
        this.estadoUsuario = status;
      }
    );
  }

  ngOnDestroy() {
    this.usuarioSubscripcion.unsubscribe();
  }

  @Output() menuToggle = new EventEmitter<void>();
  onMenuToggleDispatch() {
    this.menuToggle.emit();
  }

  terminarSesion() {
    this.seguridadServicio.saliSesion();
  }
}
