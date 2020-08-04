import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenresClientService } from './genres';
import { MoviesClientService } from './movies';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TheMovieDbInterceptor } from './the-moviedb-interceptor';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    GenresClientService,
    MoviesClientService,
    {provide: HTTP_INTERCEPTORS, useClass: TheMovieDbInterceptor, multi: true}
  ]

})
export class ClientsModule {
}
