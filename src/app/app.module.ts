import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home/home.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieSearchComponent } from './components/movie-search/movie-search.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { GenreFiltersComponent } from './components/genre-filters/genre-filters.component';
import { LoaderComponent } from './components/loader/loader.component';
import { HeaderComponent } from './components/header/header.component';
import { MovieCardFrontSideComponent } from './components/movie-card/movie-card-front-side/movie-card-front-side.component';
import { MovieCardBackSideComponent } from './components/movie-card/movie-card-back-side/movie-card-back-side.component';
import { MovieInfoGridComponent } from './components/movie-card/movie-card-back-side/movie-info-grid/movie-info-grid.component';
import { SharedModule } from './modules/shared';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieCardComponent,
    MovieSearchComponent,
    NotFoundComponent,
    MovieDetailsComponent,
    GenreFiltersComponent,
    LoaderComponent,
    HeaderComponent,
    MovieCardFrontSideComponent,
    MovieCardBackSideComponent,
    MovieInfoGridComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
