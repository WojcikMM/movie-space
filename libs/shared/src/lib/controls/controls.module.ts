import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader';
import { HeaderComponent } from './header';
import { NotFoundComponent } from './not-found';
import { InfiniteScrollComponent } from './infinite-scroll';


@NgModule({
  declarations: [
    InfiniteScrollComponent,
    LoaderComponent,
    HeaderComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    InfiniteScrollComponent,
    LoaderComponent,
    HeaderComponent,
    NotFoundComponent
  ]
})
export class ControlsModule {
}
