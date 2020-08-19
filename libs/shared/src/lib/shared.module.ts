import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlsModule } from './controls/controls.module';
import { ServicesModule } from './services/services.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromGenres from './+state/genres/genres.reducer';
import { GenresEffects } from './+state/genres/genres.effects';
import { GenresFacade } from './+state/genres/genres.facade';

@NgModule({
  imports: [
    CommonModule,
    ServicesModule,
    ControlsModule,
    StoreModule.forFeature(fromGenres.GENRES_FEATURE_KEY, fromGenres.reducer),
    EffectsModule.forFeature([GenresEffects]),
  ],
  exports: [ControlsModule],
  providers: [GenresFacade],
})
export class SharedModule {}
