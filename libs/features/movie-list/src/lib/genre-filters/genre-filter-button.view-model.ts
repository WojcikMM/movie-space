import { MovieType } from '@movie-space/shared';

export interface GenreFilterButtonViewModel {
  type: MovieType,
  label: string;
  isActive: boolean
}
