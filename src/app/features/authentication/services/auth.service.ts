import { Injectable } from '@angular/core';
import { Basehttp } from '../../../core/services/baseHttp';
import { API_KEYS } from '../../../core/constants/appAPIs';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends Basehttp {
  login(email: string, password: string) {
    return this.http.post(API_KEYS.login, { email, password });
  }
  register(user: { username: string; email: string; password: string }) {
    return this.http.post(API_KEYS.register, user);
  }
}
