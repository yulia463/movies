import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { MovieDetailsComponent } from './movie-details.component';
import {MoviesService} from "src/app/services/movies.service";

describe('MovieDetailsComponent', () => {
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let component: MovieDetailsComponent;

  let moviesServiceMock: {
    getGenres: jasmine.Spy;
    getGenreNames: jasmine.Spy;
    selectedMovie: { genre_ids: number[] } | undefined;
  };

  beforeEach(async () => {
    moviesServiceMock = {
      getGenres: jasmine.createSpy('getGenres').and.returnValue(of(void 0)), // <--- default stub
      getGenreNames: jasmine.createSpy('getGenreNames'),
      selectedMovie: undefined,
    };

    await TestBed.configureTestingModule({
      declarations: [MovieDetailsComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: MoviesService, useValue: moviesServiceMock }],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(MovieDetailsComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
  });


  it('must appear', () => {
    expect(component).toBeTruthy();
  });

  describe('reactive form', () => {
    it('must initialize with title and required validators', () => {
      fixture.detectChanges();

      const titleControl = component.form.get('title') as FormControl;
      expect(titleControl).toBeTruthy();
      titleControl.setValue('');
      expect(titleControl.hasError('required')).toBeTrue();

      titleControl.setValue('12345');
      expect(titleControl.hasError('minlength')).toBeTrue();

      titleControl.setValue('123456');
      expect(titleControl.valid).toBeTrue();
    });

    it('getter title must return FormControl', () => {
      const ctrlFromGetter = component.title;
      const ctrlFromForm = component.form.get('title');
      expect(ctrlFromGetter).toBe(ctrlFromForm as any);
      expect(ctrlFromGetter instanceof FormControl).toBeTrue();
    });
  });

  describe('ngOnInit / interaction with MoviesService', () => {
    it('must invoke getGenres at initialization', () => {
      moviesServiceMock.getGenres.and.returnValue(of(void 0));
      fixture.detectChanges();
      expect(moviesServiceMock.getGenres).toHaveBeenCalledTimes(1);
    });

    it('with selectedMovie must fill movieGenres with getGenreNames', () => {
      moviesServiceMock.selectedMovie = { genre_ids: [1, 2, 3] };
      moviesServiceMock.getGenres.and.returnValue(of(void 0));
      moviesServiceMock.getGenreNames.and.returnValue(['Action', 'Drama', 'Sci-Fi']);

      fixture.detectChanges();

      expect(moviesServiceMock.getGenres).toHaveBeenCalledTimes(1);
      expect(moviesServiceMock.getGenreNames).toHaveBeenCalledOnceWith([1, 2, 3]);
      expect(component.movieGenres).toEqual(['Action', 'Drama', 'Sci-Fi']);
    });

    it('with no selectedMovie must NOT invoke getGenreNames and let movieGenres empty', () => {
      moviesServiceMock.selectedMovie = undefined;
      moviesServiceMock.getGenres.and.returnValue(of(void 0));

      fixture.detectChanges(); // ngOnInit

      expect(moviesServiceMock.getGenres).toHaveBeenCalledTimes(1);
      expect(moviesServiceMock.getGenreNames).not.toHaveBeenCalled();
      expect(component.movieGenres).toEqual([]);
    });

    it('with error from getGenres logs an error and does not invoke getGenreNames', () => {
      const err = new Error('fail');
      moviesServiceMock.getGenres.and.returnValue(throwError(() => err));
      const consoleSpy = spyOn(console, 'error');

      fixture.detectChanges(); // ngOnInit

      expect(moviesServiceMock.getGenres).toHaveBeenCalledTimes(1);
      expect(moviesServiceMock.getGenreNames).not.toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalled(); // можно точнее:
      const [firstArg] = (consoleSpy.calls.mostRecent().args || []);
      expect(firstArg).toBe(err);
    });
  });
});
