import { MovieType } from '../../models/movie-type.enum';

export interface GenreFilterButtonViewModel {
  type: MovieType,
  label: string;
  isActive: boolean
}
