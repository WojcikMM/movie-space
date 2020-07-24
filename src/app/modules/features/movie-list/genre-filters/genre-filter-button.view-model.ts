import { MovieType } from '../../../shared';

export interface GenreFilterButtonViewModel {
  type: MovieType,
  label: string;
  isActive: boolean
}
