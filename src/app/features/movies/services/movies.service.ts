import { Injectable } from '@angular/core';
import { Basehttp } from '../../../core/services/baseHttp';
import { Params } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { API_KEYS } from '../../../core/constants/appAPIs';
import { IallMoviesResponse } from '../interfaces/IallMoviesResponse';
import { IShowsResponse } from '../interfaces/IShowsResponse';

@Injectable({
  providedIn: 'root',
})
export class MoviesService extends Basehttp {
  getAllMovies(filters?: Params) {
    const params = new HttpParams().appendAll(filters || {});
    return this.get<IallMoviesResponse[]>(API_KEYS.getAllMovies, params);
  }
  getMovieDetails(id: number) {
    return this.http.get<IallMoviesResponse>(API_KEYS.getMovieById(id));
  }
  getMovieShows(movieId: number) {
    return this.http.get<IShowsResponse[]>(API_KEYS.getShowsByMovie(movieId));
  }
}
