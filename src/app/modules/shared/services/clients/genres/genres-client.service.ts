import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { GenreListDto } from './genre-list.dto';

@Injectable()
export class GenresClientService {

  constructor(private _httpClient: HttpClient) {
  }

  getGenresList(): Observable<GenreListDto> {
    const apiUrl = environment.movieDbUrl + '/genre/movie/list';
    return this._httpClient.get<GenreListDto>(apiUrl);
  }

}
