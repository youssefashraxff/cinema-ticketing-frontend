import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { map, switchMap } from 'rxjs';
import { LoadingSpinner } from '../../../../shared/loading-spinner/loading-spinner';
import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { IShowsResponse } from '../../interfaces/IShowsResponse';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css',
  imports: [LoadingSpinner, AsyncPipe, DatePipe, RouterLink, NgClass],
})
export class MovieDetails {
  selectedDay!: string;
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

  selectDay(day: Date): void {
    this.selectedDay = day.toDateString();
  }

  getUniqueDays(shows: IShowsResponse[]): Date[] {
    const uniqueDays = new Map<string, Date>();

    shows.forEach((show) => {
      const dayKey = show.startTime.toDateString();
      if (!uniqueDays.has(dayKey)) {
        uniqueDays.set(dayKey, show.startTime);
      }
    });

    const days = Array.from(uniqueDays.values());

    // select first day by default
    if (!this.selectedDay && days.length > 0) {
      this.selectedDay = days[0].toDateString();
    }

    return days;
  }

  getShowsGroupedByHall(shows: IShowsResponse[]) {
    const hallsMap = new Map<number, { hallId: number; shows: IShowsResponse[] }>();

    shows
      .filter((show) => show.startTime.toDateString() === this.selectedDay)
      .forEach((show) => {
        if (!hallsMap.has(show.hallId)) {
          hallsMap.set(show.hallId, {
            hallId: show.hallId,
            shows: [],
          });
        }
        hallsMap.get(show.hallId)!.shows.push(show);
      });

    return Array.from(hallsMap.values());
  }
}
