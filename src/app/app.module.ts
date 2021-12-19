import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './usuario.component';
import { FormsModule } from '@angular/forms';
import { LibrosComponent } from './libros/libros.component';
import { LibroComponent } from './book/book.component';
import { LibrosService } from './services/libros.services';
import { InicioComponent } from './principal/principal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { RegistrarComponent } from './seguridad/registrar/registrar.component';
import { LoginComponent } from './seguridad/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BarraComponent } from './navegacion/barra/barra.component';
import { MenuListaComponent } from './navegacion/menu-lista/menu-lista.component';
import { SeguridadService } from './seguridad/seguridad.service';
import { ChatComponent } from './chat/chat.component';
import { BooksComponent } from './books/books.component';
import { BooksService } from './books/books.service';
import { NewBookComponent } from './new-book/new-book.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AutoresComponent } from './autors/autors.component';
import { AutoresService } from './autors/autors.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SeguridadInterceptor } from './seguridad/seguridad-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    LibrosComponent,
    LibroComponent,
    InicioComponent,
    RegistrarComponent,
    LoginComponent,
    BarraComponent,
    MenuListaComponent,
    ChatComponent,
    BooksComponent,
    NewBookComponent,
    AutoresComponent,
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
    { provide: HTTP_INTERCEPTORS, useClass: SeguridadInterceptor, multi: true },
    LibrosService,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  ],
  bootstrap: [AppComponent],
  entryComponents: [NewBookComponent],
})
export class AppModule {}
