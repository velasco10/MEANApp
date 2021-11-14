import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css'],
})
export class LibroComponent implements OnInit {
  @Input() tituloLibro: string | undefined;

  constructor() {}

  ngOnInit(): void {}

  @Output() libroClicked = new EventEmitter();
  onClicked() {
    this.libroClicked.emit();
  }
}
