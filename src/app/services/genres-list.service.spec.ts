import { GenreList } from '../models/genre-list';
import { GenresListService } from './genres-list.service';
import { of } from 'rxjs';


describe('Genres Service Tests', () => {
  let genreListService: GenresListService;
  let httpClientSpy: { get: jasmine.Spy };


  beforeEach(() => {

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    genreListService = new GenresListService(httpClientSpy as any);

  });

  it('should return expected GenreList', () => {
    const expectedResult: GenreList = { genres: [{ id: 3, name: 'Sample Genre' }] };
    httpClientSpy.get.and.returnValue(of(expectedResult));

    genreListService.getGenresList().subscribe(genreResult => {
      expect(genreResult).toEqual(expectedResult, 'expected genres results.');
    });

    expect(httpClientSpy.get.calls.count()).toBe(1, 'HttpClient calls once to get GenreList');
  });

});
