import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FooterComponent } from './footer/footer.component';
import { BookListComponent } from './book-list/book-list.component';
import { appRoutes } from './routes';
import { AuthService } from './user/auth/services';
import { BookService } from './services';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { Error404Component } from './errors/page-404/404.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {scrollPositionRestoration: 'enabled'}),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingPageComponent,
    FooterComponent,
    BookListComponent,
    Error404Component,
    SearchComponent
  ],
  providers: [
    AuthService,
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
