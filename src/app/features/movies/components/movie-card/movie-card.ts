import { Component, Input } from '@angular/core';
import { IallMoviesResponse } from '../../interfaces/IallMoviesResponse';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  imports: [RouterLink],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
export class MovieCard {
  @Input() movie!: IallMoviesResponse;
}
