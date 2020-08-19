/**
 * Interface for the 'Movies' data
 */
export interface MoviesEntity {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  genresIds: number[];
  votesAverage: number;
  votesCount: number;
  releaseDate: Date;
  score: number;
}
