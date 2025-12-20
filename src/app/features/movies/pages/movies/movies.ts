import { Component, inject } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { MovieCard } from '../../components/movie-card/movie-card';
import { LoadingSpinner } from '../../../../shared/loading-spinner/loading-spinner';
import { AsyncPipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieSearchPipe } from '../../../../shared/pipes/movies-search.pipe';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [MovieCard, LoadingSpinner, AsyncPipe, MovieSearchPipe, FormsModule, NgClass],
  templateUrl: './movies.html',
  styleUrl: './movies.css',
})
export class Movies {
  private readonly moviesService = inject(MoviesService);

  searchText: string = '';
  activeCategory: string = 'ALL';

  movies$ = this.moviesService.getAllMovies();

  onCategoryClick(category: string): void {
    this.activeCategory = category;

    if (category === 'ALL') {
      this.movies$ = this.moviesService.getAllMovies();
    } else {
      this.movies$ = this.moviesService.getMoviesByCategory(category);
    }
  }
}
