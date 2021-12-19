import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './usuario.component';
import { FormsModule } from '@angular/forms';
import { BooksListComponent } from './booksList/booksList.component';
import { BookComponent } from './book/book.component';
import { BooksListService } from './services/booksList.services';
import { PrincipalComponent } from './principal/principal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { RegisterComponent } from './seguridad/register/register.component';
import { LoginComponent } from './seguridad/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TopMenuComponent } from './navegacion/topMenu/topMenu.component';
import { SideMenuComponent } from './navegacion/sideMenu/sideMenu.component';
import { SecurityService } from './seguridad/security.service';
import { BooksComponent } from './books/books.component';
import { BooksService } from './books/books.service';
import { NewBookComponent } from './new-book/new-book.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AutorsComponent } from './autors/autors.component';
import { AutorsService } from './autors/autors.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SecurityInterceptor } from './seguridad/security-interceptor';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    BooksListComponent,
    BookComponent,
    PrincipalComponent,
    RegisterComponent,
    LoginComponent,
    TopMenuComponent,
    SideMenuComponent,
    BooksComponent,
    NewBookComponent,
    AutorsComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SecurityInterceptor, multi: true },
    BooksListService,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  ],
  bootstrap: [AppComponent],
  entryComponents: [NewBookComponent],
})
export class AppModule {}
