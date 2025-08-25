import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { MoviePageComponent } from './movie-page.component';
import { MoviesService, IMovieResponse } from 'src/app/services/movies.service';
import { ModalService } from '../../services/modal.service';

describe('MoviePageComponent', () => {
  let fixture: ComponentFixture<MoviePageComponent>;
  let component: MoviePageComponent;

  let moviesServiceMock: jasmine.SpyObj<MoviesService>;
  let modalServiceMock: jasmine.SpyObj<ModalService>;

  const mockResponse: IMovieResponse = {
    page: 1,
    results: [
      {
        id: 1,
        title: 'Test Movie',
        overview: 'Some overview',
        poster_path: '/poster.jpg',
        release_date: '2023-01-01',
        vote_average: 8.5,
        genre_ids: []
      }
    ],
    total_pages: 5,
    total_results: 1,
  };

  beforeEach(async () => {
    moviesServiceMock = jasmine.createSpyObj('MoviesService', [
      'getAllPopular',
      'searchMovies',
    ]);
    modalServiceMock = jasmine.createSpyObj('ModalService', ['open', 'close']);

    moviesServiceMock.getAllPopular.and.returnValue(of(mockResponse));
    moviesServiceMock.searchMovies.and.returnValue(of(mockResponse));

    await TestBed.configureTestingModule({
      declarations: [MoviePageComponent],
      providers: [
        { provide: MoviesService, useValue: moviesServiceMock },
        { provide: ModalService, useValue: modalServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(MoviePageComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(MoviePageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load popular movies on init', () => {
    fixture.detectChanges();

    expect(moviesServiceMock.getAllPopular).toHaveBeenCalledWith(1);
    expect(component.loading).toBeFalse();
    expect(component.movies.length).toBe(1);
    expect(component.totalPages).toBe(5);
    expect(component.currentPage).toBe(1);
  });

  it('onSearchChange should trigger search pipeline', fakeAsync(() => {
    fixture.detectChanges();

    component.onSearchChange('Matrix');
    tick(500);

    expect(moviesServiceMock.searchMovies).toHaveBeenCalledWith('Matrix', 1);
    expect(component.term).toBe('Matrix');
    expect(component.movies.length).toBeGreaterThan(0);
  }));

  it('loadPopular should update movies list', () => {
    component.loadPopular(2);

    expect(moviesServiceMock.getAllPopular).toHaveBeenCalledWith(2);
    expect(component.movies).toEqual(mockResponse.results);
    expect(component.totalPages).toBe(mockResponse.total_pages);
    expect(component.currentPage).toBe(mockResponse.page);
  });

  it('loadSearch should call searchMovies when term is set', () => {
    component.term = 'Test';
    component.loadSearch(3);

    expect(moviesServiceMock.searchMovies).toHaveBeenCalledWith('Test', 3);
  });

  it('loadSearch should call loadPopular when term is empty', () => {
    const spy = spyOn(component, 'loadPopular');
    component.term = '';
    component.loadSearch(4);

    expect(spy).toHaveBeenCalledWith(4);
  });

  it('onPageChange should call loadPopular when term is empty', () => {
    const spy = spyOn(component, 'loadPopular');
    component.totalPages = 5;
    component.term = '';
    component.onPageChange(2);

    expect(spy).toHaveBeenCalledWith(2);
  });

  it('onPageChange should call loadSearch when term is set', () => {
    const spy = spyOn(component, 'loadSearch');
    component.totalPages = 5;
    component.term = 'Matrix';
    component.onPageChange(2);

    expect(spy).toHaveBeenCalledWith(2);
  });

  it('onPageChange should do nothing if page < 1 or > totalPages', () => {
    const spyLoadPopular = spyOn(component, 'loadPopular');
    const spyLoadSearch = spyOn(component, 'loadSearch');
    component.totalPages = 3;

    component.onPageChange(0);
    component.onPageChange(4);

    expect(spyLoadPopular).not.toHaveBeenCalled();
    expect(spyLoadSearch).not.toHaveBeenCalled();
  });

  it('clearInput should reset term and trigger onSearchChange', () => {
    const spy = spyOn(component, 'onSearchChange');
    component.term = 'Matrix';
    component.clearInput();

    expect(component.term).toBe('');
    expect(spy).toHaveBeenCalledWith('');
  });
});
