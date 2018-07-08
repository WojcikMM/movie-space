import {Movie} from './movie';

export interface MovieApiResult {
    page: number;
    results: Array<Movie>;
    total_pages: number;
    total_results: number;
    }
