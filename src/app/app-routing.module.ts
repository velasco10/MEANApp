import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutorsComponent } from './autors/autors.component';
import { BooksComponent } from './books/books.component';
import { PrincipalComponent } from './principal/principal.component';
import { BooksListComponent } from './booksList/booksList.component';
import { LoginComponent } from './seguridad/login/login.component';
import { RegisterComponent } from './seguridad/register/register.component';
import { SeguridadRouter } from './seguridad/security.router';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: '', component: PrincipalComponent, canActivate:[SeguridadRouter] },
  { path: 'booksList', component: BooksListComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'books', component: BooksComponent, canActivate:[SeguridadRouter] },
  { path: 'autors', component: AutorsComponent, canActivate:[SeguridadRouter] },
  { path: 'chat', component: ChatComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[SeguridadRouter]
})
export class AppRoutingModule {}
