import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import { GLOBAL_CONST } from './modules/shared/global.const';
import { NotFoundComponent } from './components/not-found/not-found.component';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: GLOBAL_CONST.ROUTES.LIST,
    pathMatch: 'full'
  },
  {
    path: GLOBAL_CONST.ROUTES.LIST,
    loadChildren: () => import('./modules/features/movie-list').then(module => module.MovieListModule)
  },
  {
    path: GLOBAL_CONST.ROUTES.PREVIEW,
    loadChildren: () => import('./modules/features/movie-preview').then(module => module.MoviePreviewModule)
  },
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
