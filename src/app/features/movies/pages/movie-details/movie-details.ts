import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { map, switchMap } from 'rxjs';
import { LoadingSpinner } from '../../../../shared/loading-spinner/loading-spinner';
import { AsyncPipe, DatePipe } from '@angular/common';
import { IShowsResponse } from '../../interfaces/IShowsResponse';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css',
  imports: [LoadingSpinner, AsyncPipe, DatePipe, RouterLink],
})
export class MovieDetails {
  private readonly moviesService = inject(MoviesService);
  private readonly activatedRoute = inject(ActivatedRoute);

  movie$ = this.activatedRoute.paramMap.pipe(
    map((params) => Number(params.get('id'))),
    switchMap((id) => this.moviesService.getMovieDetails(id))
  );
  shows$ = this.activatedRoute.paramMap.pipe(
    map((param) => Number(param.get('id'))),
    switchMap((id) =>
      this.moviesService.getMovieShows(id).pipe(
        map((shows: IShowsResponse[]) =>
          shows.map((show) => ({
            ...show,
            startTime: new Date(show.startTime),
            finishTime: new Date(show.finishTime),
          }))
        )
      )
    )
  );
}
