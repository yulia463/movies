import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {MoviesService} from 'src/app/services/movies.service'
import {ModalService} from '../../services/modal.service'

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.scss']
})
export class CreateMovieComponent implements OnInit {

  movieGenres: string[] = [];

  constructor(
    public moviesService: MoviesService,
    public modalService: ModalService,
  ) {
  }


  form = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6)
    ])
  })

  get title() {
    return this.form.controls.title as FormControl
  }

  ngOnInit(): void {
    this.moviesService.getGenres().subscribe({
      next: () => {
        if (this.moviesService.selectedMovie) {
          const genreIds = this.moviesService.selectedMovie.genre_ids;
          this.movieGenres = this.moviesService.getGenreNames(genreIds);
        }
      },
      error: err => console.error(err)
    });
  }

}
