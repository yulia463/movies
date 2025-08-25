import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MoviesService, IMovieResponse } from './movies.service';
import { ErrorService } from './error.service';
import { environment } from 'src/environments/environment';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpMock: HttpTestingController;
  let errorService: jasmine.SpyObj<ErrorService>;

  beforeEach(() => {
    const errorSpy = jasmine.createSpyObj('ErrorService', ['handle']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MoviesService,
        { provide: ErrorService, useValue: errorSpy }
      ]
    });

    service = TestBed.inject(MoviesService);
    httpMock = TestBed.inject(HttpTestingController);
    errorService = TestBed.inject(ErrorService) as jasmine.SpyObj<ErrorService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should load popular movies', () => {
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
      total_pages: 1,
      total_results: 1
    };

    service.getAllPopular().subscribe(response => {
      expect(response.results.length).toBe(1);
      expect(service.movies.length).toBe(1);
    });

    const req = httpMock.expectOne(`${environment.tmdbApiUrl}/movie/popular?api_key=${environment.tmdbApiKey}&language=en-US&page=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should return poster URL', () => {
    const url = service.getPosterUrl('/path');
    expect(url).toContain('/path');
    expect(service.getPosterUrl(null)).toBeNull();
  });

  it('should set selected movie', () => {
    const movie = {
      id: 1,
      title: 'Test',
      overview: 'Overview',
      poster_path: '/poster.jpg',
      release_date: '2023-01-01',
      vote_average: 9,
      genre_ids: []
    };
    service.setSelectedMovie(movie);
    expect(service.selectedMovie).toEqual(movie);
  });

  it('should return genre names', () => {
    service.genres = [{ id: 1, name: 'Action' }];
    expect(service.getGenreNames([1])).toEqual(['Action']);
  });
});
