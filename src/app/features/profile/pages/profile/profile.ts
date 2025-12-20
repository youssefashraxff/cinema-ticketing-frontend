import { Component, inject } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { AsyncPipe, DatePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [AsyncPipe, UpperCasePipe, DatePipe],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  private readonly profileService = inject(ProfileService);

  userId = localStorage.getItem('userId');
  user$ = this.profileService.getUserById(Number(this.userId));

  bookings$ = this.profileService.getBookingsByCustomer(Number(this.userId));
}
