import { Component, OnInit } from '@angular/core';
import {MoviesService} from 'src/app/services/movies.service'
import {ModalService} from '../../services/modal.service'

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss']
})
export class MoviePageComponent implements OnInit {
  title = 'angular app'
  loading = false
  term = ''

  constructor(
    public moviesService: MoviesService,
    public modalService: ModalService
  ) {
  }

  ngOnInit(): void {
    this.loading = true
    this.moviesService.getAllPopular().subscribe(() => {
      this.loading = false
    })
  }
}
