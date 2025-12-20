import { Injectable } from '@angular/core';
import { Basehttp } from '../../../../core/services/baseHttp';
import { API_KEYS } from '../../../../core/constants/appAPIs';

@Injectable({
  providedIn: 'root',
})
export class ShowsManagementService extends Basehttp {
  /* ================= SHOWS CRUD ================= */

  getAllShows() {
    return this.get<any[]>(API_KEYS.getAllShows);
  }

  getShowById(id: number) {
    return this.get<any>(API_KEYS.getShowById(id));
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
}
