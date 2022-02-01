import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './seguridad/login/login.component';
import { RegisterComponent } from './seguridad/register/register.component';
import { SeguridadRouter } from './seguridad/security.router';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: '', component: PrincipalComponent, canActivate:[SeguridadRouter] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'chat', component: ChatComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[SeguridadRouter]
})
export class AppRoutingModule {}
