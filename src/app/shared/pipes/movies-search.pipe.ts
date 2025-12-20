import { Pipe, PipeTransform } from '@angular/core';
import { IallMoviesResponse } from '../../features/movies/interfaces/IallMoviesResponse';

@Pipe({
  name: 'movieSearch',
  standalone: true,
  pure: true,
})
export class MovieSearchPipe implements PipeTransform {
  transform(movies: IallMoviesResponse[], search: string): IallMoviesResponse[] {
    if (!movies || !search) return movies;

    const value = search.toLowerCase();
    return movies.filter(
      (movie) =>
        movie.name.toLowerCase().includes(value) ||
        movie.MovieDescription.toLowerCase().includes(value) ||
        movie.movieCategory.type.toLowerCase().includes(value)
    );
  }
}
