import { MovieDto } from './movie.dto';

export interface MovieApiResultDto {
  page: number;
  results: Array<MovieDto>;
  total_pages: number;
  total_results: number;
}
