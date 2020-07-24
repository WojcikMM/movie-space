import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollComponent } from './infinite-scroll';
import { LoaderComponent } from './loader';
import { HeaderComponent } from './header';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    InfiniteScrollComponent,
    LoaderComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    InfiniteScrollComponent,
    LoaderComponent,
    HeaderComponent
  ]
})
export class ControlsModule {
}
