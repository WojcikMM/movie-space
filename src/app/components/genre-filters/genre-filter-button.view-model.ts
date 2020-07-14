import { MovieType } from '../../modules/shared';

export interface GenreFilterButtonViewModel {
  type: MovieType,
  label: string;
  isActive: boolean
}
