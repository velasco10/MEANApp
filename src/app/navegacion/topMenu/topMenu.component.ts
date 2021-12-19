import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { SecurityService } from 'src/app/seguridad/security.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-topMenu',
  templateUrl: './topMenu.component.html',
  styleUrls: ['./topMenu.component.css'],
})
export class TopMenuComponent implements OnInit, OnDestroy {
  userSubscripcion!: Subscription;
  userState!: boolean;
  constructor(private securityService: SecurityService) {}

  ngOnInit(): void {
    this.userSubscripcion = this.securityService.securityChange.subscribe(
      (status) => {
        this.userState = status;
      }
    );
  }

  ngOnDestroy() {
    this.userSubscripcion.unsubscribe();
  }

  @Output() menuToggle = new EventEmitter<void>();
  onMenuToggleDispatch() {
    this.menuToggle.emit();
  }

  closeSession() {
    this.securityService.closeSession();
  }
}
