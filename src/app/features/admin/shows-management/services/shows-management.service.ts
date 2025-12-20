import { Injectable } from '@angular/core';
import { Basehttp } from '../../../../core/services/baseHttp';
import { API_KEYS } from '../../../../core/constants/appAPIs';
import { IShowResponse } from '../interfaces/IShowResponse';

@Injectable({
  providedIn: 'root',
})
export class ShowsManagementService extends Basehttp {
  /* ================= SHOWS CRUD ================= */

  getAllShows() {
    return this.get<IShowResponse[]>(API_KEYS.getAllShows);
  }

  getShowById(id: number) {
    return this.get<IShowResponse>(API_KEYS.getShowById(id));
  }

  createShow(show: any) {
    return this.post<any>(API_KEYS.createShow, show);
  }

  deleteShow(id: number) {
    return this.delete(API_KEYS.deleteShow(id));
  }

  /* ================= ASSIGNMENTS ================= */

  assignShowToHall(payload: { showId: number; hallId: number }) {
    return this.post(API_KEYS.assignShowToHall, payload);
  }

  assignMovieToShow(payload: { showId: number; movieId: number }) {
    return this.post(API_KEYS.assignMovieToShow, payload);
  }

  /* ================= FILTER ================= */

  getShowsByMovie(movieId: number) {
    return this.get<any[]>(API_KEYS.getShowsByMovie(movieId));
  }

  getShowsByHall(hallId: number) {
    return this.get<any[]>(API_KEYS.getShowsByHall(hallId));
  }
}
