import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { MoviePreviewEntity } from './models';
import { Observable } from 'rxjs';
import { MoviesClientService } from '@movie-space/shared';
import { map } from 'rxjs/operators';
import { MovieDetailsDto } from '../../../../shared/src/lib/services/clients/movies';

@Injectable({
  providedIn: 'root'
})
export class MoviePreviewResolverService implements Resolve<MoviePreviewEntity> {

  constructor(private readonly _moviesClientService: MoviesClientService,
              private readonly _router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<MoviePreviewEntity> {
    const movieId = +route.paramMap.get('id');
    if (movieId && !Number.isNaN(movieId)) {
      return this._moviesClientService.getMovieById(+movieId)
        .pipe(map(this._mapToEntity));
    }

    this._router.navigate(['/'])
      .catch(() => {
        console.error('Cannot redirect to route site.');
      });
    return undefined;
  }

  private _mapToEntity(movieDetailsDto: MovieDetailsDto): MoviePreviewEntity {
    return {
      id: movieDetailsDto.id,
      imdbId: movieDetailsDto.imdb_id,
      genres: movieDetailsDto.genres,
      belongsToCollection: movieDetailsDto.belongs_to_collection,
      homepage: movieDetailsDto.homepage,
      backdropPath: movieDetailsDto.backdrop_path,
      credits: {
        cast: movieDetailsDto.credits.cast.map(cast => ({
          castId: cast.cast_id,
          character: cast.character,
          creditId: cast.credit_id,
          gender: cast.gender,
          id: cast.id,
          name: cast.name,
          order: cast.order,
          profilePath: cast.profile_path
        })),
        crew: movieDetailsDto.credits.crew.map(crew => ({
          creditId: crew.credit_id,
          department: crew.department,
          profilePath: crew.profile_path,
          gender: crew.gender,
          id: crew.id,
          job: crew.job,
          name: crew.name
        }))
      },
      budget: movieDetailsDto.budget,
      adult: movieDetailsDto.adult,
      originalLanguage: movieDetailsDto.original_language,
      originalTitle: movieDetailsDto.original_title,
      overview: movieDetailsDto.overview,
      popularity: movieDetailsDto.popularity,
      posterPath: movieDetailsDto.poster_path,
      productionCompanies: movieDetailsDto.production_companies.map(company => ({
        id: company.id,
        logoPath: company.logo_path,
        name: company.name,
        originCountry: company.origin_country
      })),
      productionCountries: movieDetailsDto.production_countries.map(country => ({
        isoId: country.iso_3166_1,
        name: country.name
      })),
      release_date: movieDetailsDto.release_date,
      revenue: movieDetailsDto.revenue,
      runtime: movieDetailsDto.runtime,
      spokenLanguages: movieDetailsDto.spoken_languages.map(lang => ({
        isoId: lang.iso_639_1,
        name: lang.name
      })),
      status: movieDetailsDto.status,
      tagline: movieDetailsDto.tagline,
      title: movieDetailsDto.title,
      video: movieDetailsDto.video,
      voteAverage: movieDetailsDto.vote_average,
      voteCount: movieDetailsDto.vote_count

    };
  }
}
