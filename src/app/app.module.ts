import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieDescriptionPipe } from './pipes/movie-description.pipe';
import { MovieSearchComponent } from './components/movie-search/movie-search.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { GenreFiltersComponent } from './components/genre-filters/genre-filters.component';
import { LoaderComponent } from './components/loader/loader.component';
import { TheMovieDbInterceptor } from './interceptors/the-moviedb-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieCardComponent,
    MovieDescriptionPipe,
    MovieSearchComponent,
    NotFoundComponent,
    MovieDetailsComponent,
    GenreFiltersComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TheMovieDbInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
