import { SpokenLanguage } from './SpokenLanguage';
import { ProductionCountry } from './ProductionCountry';
import { ProductionCompany } from './ProductionCompany';
import { Genre } from './Genre';
import { Credits } from './Credits';

export interface MovieDetailsResult {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection?: any;
    budget: number;
    credits: Credits;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path?: any;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
