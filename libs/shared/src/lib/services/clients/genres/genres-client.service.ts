import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenreListDto } from './genre-list.dto';
import { GLOBAL_CONST } from '../../../global.const';

@Injectable()
export class GenresClientService {

  private readonly _prefixUrl = GLOBAL_CONST.MOVIE_DB.URL;

  constructor(private _httpClient: HttpClient) {
  }

  getGenresList(): Observable<GenreListDto> {
    return this._httpClient.get<GenreListDto>(`${this._prefixUrl}/genre/movie/list`);
  }

}
