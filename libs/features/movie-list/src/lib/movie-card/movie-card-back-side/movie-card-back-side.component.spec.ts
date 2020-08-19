import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCardBackSideComponent } from './movie-card-back-side.component';
import { Component, Input } from '@angular/core';
import { MoviesEntity } from '../../+state/movies/movies.models';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  template: '',
  selector: 'ms-list-movie-info-grid'
})
class MovieInfoGridStubComponent {
  @Input() movie: MoviesEntity;
}


describe('MovieCardBackSizeComponent', () => {
  let component: MovieCardBackSideComponent;
  let fixture: ComponentFixture<MovieCardBackSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MovieCardBackSideComponent, MovieInfoGridStubComponent],
      imports: [RouterTestingModule.withRoutes([])]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCardBackSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
