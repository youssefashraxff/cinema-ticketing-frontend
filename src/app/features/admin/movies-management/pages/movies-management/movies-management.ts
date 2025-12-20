import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { IallMoviesResponse } from '../../../../movies/interfaces/IallMoviesResponse';
import { MoviesService } from '../../../../movies/services/movies.service';

@Component({
  selector: 'app-movies-management',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './movies-management.html',
  styleUrl: './movies-management.css',
})
export class MoviesManagement {
  private readonly moviesService = inject(MoviesService);

  allMovies$ = this.moviesService.getAllMovies();

  isCreateMovieOpen = false;

  openCreateMovieModal() {
    this.isCreateMovieOpen = true;
  }

  closeCreateMovieModal() {
    this.isCreateMovieOpen = false;
  }
}
