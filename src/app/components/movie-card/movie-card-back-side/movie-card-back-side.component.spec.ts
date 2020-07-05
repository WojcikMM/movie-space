import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCardBackSideComponent } from './movie-card-back-side.component';

describe('MovieCardBackSizeComponent', () => {
  let component: MovieCardBackSideComponent;
  let fixture: ComponentFixture<MovieCardBackSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieCardBackSideComponent ]
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
