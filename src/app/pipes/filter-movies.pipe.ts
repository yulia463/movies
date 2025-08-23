import { Pipe, PipeTransform } from '@angular/core';
import {IMovie} from 'src/app/models/movie'

@Pipe({
  name: 'filterMovies'
})
export class FilterMoviesPipe implements PipeTransform {

  transform(movies: IMovie[], search: string): IMovie[] {
    if (search.length === 0) return movies
    return movies.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
  }

}
