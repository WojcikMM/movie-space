import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
  SharedModule,
  GLOBAL_CONST,
  NotFoundComponent,
} from '@movie-space/shared';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: GLOBAL_CONST.ROUTES.LIST,
        pathMatch: 'full'
      },
      {
        path: GLOBAL_CONST.ROUTES.LIST,
        loadChildren: () => import('@movie-space/features/movie-list').then(module => module.MovieListModule)
      },
      {
        path: GLOBAL_CONST.ROUTES.PREVIEW,
        loadChildren: () => import('@movie-space/features/movie-preview').then(module => module.MoviePreviewModule)
      },
      { path: '**', component: NotFoundComponent }
    ]),
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
