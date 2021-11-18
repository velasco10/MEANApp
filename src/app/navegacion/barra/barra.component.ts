import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output() menuToggle = new EventEmitter<void>();
  onMenuToggleDispatch(){
    this.menuToggle.emit();
  }

}
