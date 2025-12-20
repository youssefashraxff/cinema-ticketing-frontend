import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { map, Observable, switchMap } from 'rxjs';
import { LoadingSpinner } from '../../../../shared/loading-spinner/loading-spinner';
import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { IShowsResponse } from '../../interfaces/IShowsResponse';
import { ReviewService } from '../../services/review.service';
import { IReviewResponse } from '../../interfaces/IReviewResponse';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css',
  imports: [LoadingSpinner, AsyncPipe, DatePipe, RouterLink, NgClass, FormsModule],
})
export class MovieDetails {
  selectedDay!: string;
  private readonly moviesService = inject(MoviesService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly reviewService = inject(ReviewService);
  private readonly router = inject(Router);

  rating!: number;
  comment: string = '';
  reviews$!: Observable<IReviewResponse[]>;
  movieSnapshot: any;

  movie$ = this.activatedRoute.paramMap.pipe(
    map((params) => Number(params.get('id'))),
    switchMap((id) =>
      this.moviesService.getMovieDetails(id).pipe(
        map((movie) => {
          this.reviews$ = this.reviewService.getMovieReviews(movie.name);
          this.movieSnapshot = movie;
          return movie;
        })
      )
    )
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

  submitReview(): void {
    if (!this.rating || !this.comment) return;

    const customerId = Number(localStorage.getItem('userId'));

    this.reviewService
      .addReview({
        movieName: this.movieSnapshot?.name,
        userId: customerId.toString(),
        rating: this.rating,
        comment: this.comment,
      })
      .subscribe(() => {
        this.comment = '';
        this.rating = undefined!;
        this.reviews$ = this.reviewService.getMovieReviews(this.movieSnapshot.name);
      });
  }
}
