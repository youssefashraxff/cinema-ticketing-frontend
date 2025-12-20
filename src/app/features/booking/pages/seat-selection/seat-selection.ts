import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';

import { BookingService } from '../../services/booking.service';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { LoadingSpinner } from '../../../../shared/loading-spinner/loading-spinner';
import { ISeatResponse } from '../../interfaces/ISeatResponse';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.html',
  imports: [AsyncPipe, LoadingSpinner, CurrencyPipe],
  styleUrl: './seat-selection.css',
})
export class SeatSelection {
  private readonly route = inject(ActivatedRoute);
  private readonly bookingService = inject(BookingService);

  show$ = this.route.paramMap.pipe(
    map((params) => Number(params.get('showId'))),
    switchMap((showId) => this.bookingService.getShowById(showId))
  );

  hall$ = this.show$.pipe(switchMap((show) => this.bookingService.getHallById(show.hallId)));

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
}
