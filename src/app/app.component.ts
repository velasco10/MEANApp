import { Component, OnInit } from '@angular/core';
import { SecurityService } from './seguridad/security.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  abrirMenu = false;
  constructor(private securityService: SecurityService) {}

  ngOnInit(): void {
    this.securityService.loadUser();
  }
}
