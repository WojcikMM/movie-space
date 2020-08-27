import { GenreDto } from '@movie-space/shared';

export interface MoviePreviewEntity {
  adult: boolean;
  backdropPath: string;
  belongsToCollection?: any;
  budget: number;
  credits: Credits;
  genres: GenreDto[];
  homepage: string;
  id: number;
  imdbId: string;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath?: any;
  productionCompanies: ProductionCompany[];
  productionCountries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spokenLanguages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
}


export interface Credits {
  cast: CastDto[];
  crew: Crew[];
}

export interface CastDto {
  castId: number;
  character: string;
  creditId: string;
  gender: number;
  id: number;
  name: string;
  order: number;
  profilePath: string;
}

export interface Crew {
  creditId: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  name: string;
  profilePath: string;
}

export interface ProductionCompany {
  id: number;
  logoPath: string;
  name: string;
  originCountry: string;
}

export interface ProductionCountry {
  isoId: string;
  name: string;
}

export interface SpokenLanguage {
  isoId: string;
  name: string;
}
