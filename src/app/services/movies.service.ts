import {Injectable} from '@angular/core'
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http'
import {catchError, delay, Observable, retry, tap, throwError, map} from 'rxjs'
import {IMovie} from 'src/app/models/movie'
import {ErrorService} from './error.service'
import {environment} from "src/environments/environment";

interface IGenre {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})

export class MoviesService {
  private readonly apiKey = environment.tmdbApiKey;
  private readonly baseUrl = environment.tmdbApiUrl;
  private readonly imageUrl = environment.tmdbImageUrl;

  movies: IMovie[] = [];

  selectedMovie: IMovie | null = null;

  genres: IGenre[] = [];

  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {}

  getAllPopular(): Observable<IMovie[]> {
    const url = `${this.baseUrl}/movie/popular`;
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'en-US')
      .set('page', '1');

    return this.http.get<{ results: IMovie[] }>(url, { params }).pipe(
      delay(200),
      retry(2),
      tap(response => this.movies = response.results),
      map(response => response.results),
      catchError(this.errorHandler.bind(this))
    );
  }

  getPosterUrl(path: string | null, size: string = 'w300'): string | null {
    return path ? `${this.imageUrl}/${size}${path}` : null;
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }

  setSelectedMovie(movie: IMovie){
    this.selectedMovie = movie
  }

  getGenres(): Observable<IGenre[]> {
    const url = `${this.baseUrl}/genre/movie/list`;
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'en-US');

    return this.http.get<{ genres: IGenre[] }>(url, { params }).pipe(
      map(response => {
        this.genres = response.genres;
        return response.genres;
      }),
      catchError(this.errorHandler.bind(this))
    );
  }

  getGenreNames(ids: number[]): string[] {
    if (!this.genres.length) return [];
    return this.genres
      .filter(g => ids.includes(g.id))
      .map(g => g.name);
  }
}
