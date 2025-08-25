import {Component, Input} from '@angular/core'
import {IMovie} from 'src/app/models/movie'
import {MoviesService} from "src/app/services/movies.service";
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html'
})
export class MovieComponent {
  constructor(
    public moviesService: MoviesService,
    public modalService: ModalService,
  ) {
  }
  @Input() movie: IMovie

  public handleShowDetailsClick() {
    this.moviesService.setSelectedMovie(this.movie)
    this.modalService.open()
  }

}
