import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {AppComponent} from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieDescriptionPipe } from './pipes/movie-description.pipe';
import { MovieSearchComponent } from './components/movie-search/movie-search.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieCardComponent,
    MovieDescriptionPipe,
    MovieSearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
