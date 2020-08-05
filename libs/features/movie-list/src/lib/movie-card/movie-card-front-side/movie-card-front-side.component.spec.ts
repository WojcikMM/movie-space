import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCardFrontSideComponent } from './movie-card-front-side.component';
import { By } from '@angular/platform-browser';
import { GLOBAL_CONST } from '@movie-space/shared';

describe('MovieCardFrontSideComponent', () => {
  let component: MovieCardFrontSideComponent;
  let fixture: ComponentFixture<MovieCardFrontSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MovieCardFrontSideComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCardFrontSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render \'alt\' property based by movieTitle @Input', () => {
    const title = 'Sample title';
    component.movieTitle = title;
    fixture.detectChanges();

    const imgElement = getImgElement();
    expect(imgElement.alt).toEqual(title);
  });

  it('should render img placeholder when no posterUrl is specified', () => {
    fixture.detectChanges();

    const imgElement = getImgElement();
    expect(imgElement.src).toBeDefined();
    expect(imgElement.src).toContain(GLOBAL_CONST.MOVIE_DB.POSTER_PLACEHOLDER_SRC);

  });

  it('should render img with correct url with prefix', () => {
    const posterUrl = 'sample/poster_1/url/123.jpeg';
    component.posterUrl = posterUrl;
    fixture.detectChanges();

    const imgElement = getImgElement();

    expect(imgElement.src).toEqual(`${GLOBAL_CONST.MOVIE_DB.POSTER_URL_PREFIX}${posterUrl}`);
  });

  function getImgElement(): HTMLImageElement {
    return fixture.debugElement.query(By.css('img.movie-card-front-side')).nativeElement as HTMLImageElement;
  }
});
