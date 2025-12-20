import { Injectable } from '@angular/core';
import { Basehttp } from '../../../core/services/baseHttp';
import { API_KEYS } from '../../../core/constants/appAPIs';
import { ISeatResponse } from '../interfaces/ISeatResponse';
import { IHallsResponse } from '../interfaces/IHallsResponse';
import { IShowResponse } from '../../admin/shows-management/interfaces/IShowResponse';
import { IBookingResponse } from '../interfaces/IBookingResponse';

@Injectable({
  providedIn: 'root',
})
export class BookingService extends Basehttp {
  getShowById(id: number) {
    return this.http.get<IShowResponse>(API_KEYS.getShowById(id));
  }
  getHallById(id: number) {
    return this.http.get<IHallsResponse>(API_KEYS.getHallById(id));
  }

  getAvailableSeats(showId: number) {
    console.log('Show Id : ', showId);
    return this.http.get<ISeatResponse[]>(API_KEYS.getRemainingSeats(showId));
  }

  payByCash() {
    return this.http.post(API_KEYS.payByCash, {});
  }

  payByCard(cardData: { cardNumber: string; cardHolder: string; expiry: string; cvv: string }) {
    return this.http.post(API_KEYS.payByCard, cardData);
  }

  payByPaypal(paypalData: { email: string }) {
    return this.http.post(API_KEYS.payByPaypal, paypalData);
  }

  bookSeats(data: {
    customerId: number;
    movieId: number;
    showId: number;
    paymentType: string;
    seats: {
      row: string;
      number: number;
    }[];
  }) {
    return this.http.post<IBookingResponse>(API_KEYS.createBooking, data);
  }
}
