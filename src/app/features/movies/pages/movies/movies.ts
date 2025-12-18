import { Component, inject } from '@angular/core';

import { MoviesService } from '../../services/movies.service';
import { MovieCard } from '../../components/movie-card/movie-card';
import { LoadingSpinner } from '../../../../shared/loading-spinner/loading-spinner';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-movies',
  imports: [MovieCard, LoadingSpinner, AsyncPipe],
  templateUrl: './movies.html',
  styleUrl: './movies.css',
})
export class Movies {
  private readonly moviesService = inject(MoviesService);

  movies$ = this.moviesService.getAllMovies();
}
