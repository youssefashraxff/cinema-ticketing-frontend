import { Injectable } from '@angular/core';
import { Basehttp } from '../../../core/services/baseHttp';
import { API_KEYS } from '../../../core/constants/appAPIs';
import { IShowsResponse } from '../../movies/interfaces/IShowsResponse';
import { ISeatResponse } from '../interfaces/ISeatResponse';
import { IHallsResponse } from '../interfaces/IHallsResponse';

@Injectable({
  providedIn: 'root',
})
export class BookingService extends Basehttp {
  getShowById(id: number) {
    return this.http.get<IShowsResponse>(API_KEYS.getShowById(id));
  }
  getHallById(id: number) {
    return this.http.get<IHallsResponse>(API_KEYS.getHallById(id));
  }

  getAvailableSeats(showId: number) {
    console.log('Show Id : ', showId);
    return this.http.get<ISeatResponse[]>(API_KEYS.getRemainingSeats(showId));
  }
}
