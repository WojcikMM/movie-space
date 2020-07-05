import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieInfoGridComponent } from './movie-info-grid.component';

describe('MovieInfoGridComponent', () => {
  let component: MovieInfoGridComponent;
  let fixture: ComponentFixture<MovieInfoGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieInfoGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieInfoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
