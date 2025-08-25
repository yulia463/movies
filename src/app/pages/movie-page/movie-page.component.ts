import {Component, OnInit} from '@angular/core';
import {IMovieResponse, MoviesService} from 'src/app/services/movies.service'
import {ModalService} from '../../services/modal.service'
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
})
export class MoviePageComponent implements OnInit {
  title = 'angular app'
  loading = false
  term = ''

  currentPage = 1;
  totalPages = 0;
  movies: any[] = [];

  private searchSubject = new Subject<string>();

  constructor(
    public moviesService: MoviesService,
    public modalService: ModalService
  ) {
  }

  ngOnInit(): void {
    this.loading = true
    this.loadPopular(1);

    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(term => {
        this.loading = true;
        this.term = term;
        this.currentPage = 1;
        if (!term) {
          return this.moviesService.getAllPopular(this.currentPage);
        }
        return this.moviesService.searchMovies(term, this.currentPage);
      })
    ).subscribe((response: IMovieResponse) => {
      this.loading = false;
      this.movies = response.results;
      this.totalPages = response.total_pages;
      this.currentPage = response.page;
    });
  }

  onSearchChange(value: string) {
    this.searchSubject.next(value);
  }

  loadPopular(page: number) {
    this.loading = true;
    this.moviesService.getAllPopular(page).subscribe((response: IMovieResponse) => {
      this.loading = false;
      this.movies = response.results;
      this.totalPages = response.total_pages;
      this.currentPage = response.page;
    });
  }

  loadSearch(page: number) {
    if (!this.term) return this.loadPopular(page);

    this.loading = true;
    this.moviesService.searchMovies(this.term, page).subscribe((response: IMovieResponse) => {
      this.loading = false;
      this.movies = response.results;
      this.totalPages = response.total_pages;
      this.currentPage = response.page;
    });
  }

  onPageChange(page: number) {
    if (page < 1 || page > this.totalPages) return;

    if (this.term) {
      this.loadSearch(page);
    } else {
      this.loadPopular(page);
    }
  }

  clearInput() {
    this.term = '';
    this.onSearchChange('');
  }
}
