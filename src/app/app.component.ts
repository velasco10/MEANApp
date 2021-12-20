import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SecurityService } from './seguridad/security.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  userState!: boolean;
  userSubscription!: Subscription;
  abrirMenu = false;
  constructor(private securityService: SecurityService) {}

  ngOnInit(): void {
    this.securityService.loadUser();
    this.userSubscription = this.securityService.securityChange.subscribe(
      (status) => {
        this.userState = status;
      }
    );
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe()
  }

}
