import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { SecurityService } from 'src/app/seguridad/security.service';

@Component({
  selector: 'app-sideMenu',
  templateUrl: './sideMenu.component.html',
  styleUrls: ['./sideMenu.component.css'],
})
export class SideMenuComponent implements OnInit,OnDestroy {
  userState!: boolean;
  userSubscription!: Subscription;

  constructor(private securityService: SecurityService) {}

  ngOnInit(): void {
    this.userSubscription = this.securityService.securityChange.subscribe(
      (status) => {
        this.userState = status;
      }
    );
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe()
  }

  @Output() menuToggle = new EventEmitter();
  onCloseMenu() {
    this.menuToggle.emit();
  }

  closeSessionMenu() {
    this.onCloseMenu();
    this.securityService.closeSession();
  }
}
