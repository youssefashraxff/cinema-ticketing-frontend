import { Injectable } from '@angular/core';
import { Basehttp } from '../../../core/services/baseHttp';
import { IBookingResponse } from '../../booking/interfaces/IBookingResponse';
import { API_KEYS } from '../../../core/constants/appAPIs';
import { IUserResponse } from '../interfaces/IUserResponse';

@Injectable({
  providedIn: 'root',
})
export class ProfileService extends Basehttp {
  getUserById(id: number) {
    return this.http.get<IUserResponse>(API_KEYS.getUserById(id));
  }
  getBookingsByCustomer(customerId: number) {
    return this.http.get<IBookingResponse[]>(API_KEYS.getBookingsByCustomer(customerId));
  }
}
