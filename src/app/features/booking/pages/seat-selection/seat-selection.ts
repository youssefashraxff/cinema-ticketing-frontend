import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';

import { BookingService } from '../../services/booking.service';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { LoadingSpinner } from '../../../../shared/loading-spinner/loading-spinner';
import { ISeatResponse } from '../../interfaces/ISeatResponse';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.html',
  imports: [AsyncPipe, LoadingSpinner, CurrencyPipe, DatePipe, FormsModule, ReactiveFormsModule],
  styleUrl: './seat-selection.css',
})
export class SeatSelection {
  private readonly route = inject(ActivatedRoute);
  private readonly bookingService = inject(BookingService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  showSnapshot: any;

  show$ = this.route.paramMap.pipe(
    map((params) => Number(params.get('showId'))),
    switchMap((showId) =>
      this.bookingService.getShowById(showId).pipe(
        map((show) => {
          this.showSnapshot = show;
          return show;
        })
      )
    )
  );

  hall$ = this.show$.pipe(switchMap((show) => this.bookingService.getHallById(show.hall.hallId)));

  seatPrice = 0;

  constructor() {
    this.hall$.subscribe((hall) => {
      this.seatPrice = hall.seatPrice;
    });
  }

  totalPrice = 0;

  availableSeats$ = this.route.paramMap.pipe(
    map((params) => Number(params.get('showId'))),
    switchMap((showId) => this.bookingService.getAvailableSeats(showId))
  );

  selectedSeats: ISeatResponse[] = [];

  isSeatAvailable(row: string, number: number, availableSeats: ISeatResponse[]): boolean {
    return availableSeats.some((s) => s.row === row && s.number === number);
  }
  isSeatSelected(row: string, number: number): boolean {
    return this.selectedSeats.some((s) => s.row === row && s.number === number);
  }
  toggleSeat(row: string, number: number, availableSeats: ISeatResponse[]) {
    if (!this.isSeatAvailable(row, number, availableSeats)) return;

    const seatId = `${row}${number}`;

    const index = this.selectedSeats.findIndex((s) => s.row === row && s.number === number);

    if (index >= 0) {
      this.selectedSeats.splice(index, 1);
      this.totalPrice -= this.seatPrice;
    } else {
      this.selectedSeats.push({ row, number, seatId });
      this.totalPrice += this.seatPrice;
    }
  }

  selectedPayment: 'CARD' | 'PAYPAL' | 'CASH' = 'CARD';

  paymentForm: FormGroup = this.fb.group({
    cardNumber: [''],
    cardHolder: [''],
    expiry: [''],
    cvv: [''],
    paypalEmail: [''],
  });

  private createBooking(paymentType: 'CARD' | 'PAYPAL' | 'CASH') {
    const customerId = Number(localStorage.getItem('userId')); // or adjust later
    const showId = Number(this.route.snapshot.paramMap.get('showId'));

    this.bookingService
      .bookSeats({
        customerId,
        movieId: this.showSnapshot.movie.movieId,
        showId,
        paymentType,
        seats: this.selectedSeats.map((s) => ({
          row: s.row,
          number: s.number,
        })),
      })
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/profile');
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  confirmPayment() {
    if (this.selectedPayment === 'CARD') {
      const cardData = {
        cardNumber: this.paymentForm.value.cardNumber,
        cardHolder: this.paymentForm.value.cardHolder,
        expiry: this.paymentForm.value.expiry,
        cvv: this.paymentForm.value.cvv,
      };
      this.bookingService.payByCard(cardData).subscribe({
        next: () => {
          this.createBooking('CARD');
        },
        error: (error) => {
          console.log(error);
        },
      });
    }

    if (this.selectedPayment === 'PAYPAL') {
      const paypalData = {
        email: this.paymentForm.value.paypalEmail,
      };
      this.bookingService.payByPaypal(paypalData).subscribe({
        next: () => {
          this.createBooking('PAYPAL');
        },
        error: (error) => {
          console.log(error);
        },
      });
    }

    if (this.selectedPayment === 'CASH') {
      this.bookingService.payByCash().subscribe({
        next: () => {
          this.createBooking('CASH');
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
