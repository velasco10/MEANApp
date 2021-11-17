import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { LibrosService } from '../services/libros.services';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css'],
})
export class LibroComponent implements OnInit {
  @Input() tituloLibro: string | undefined;

  constructor(private LibrosService : LibrosService) {}

  ngOnInit(): void {

  }

  @Output() libroClicked = new EventEmitter();
  onClicked() {
    // this.libroClicked.emit();
    this.LibrosService.deleteLibro(this.tituloLibro)
  }
}
