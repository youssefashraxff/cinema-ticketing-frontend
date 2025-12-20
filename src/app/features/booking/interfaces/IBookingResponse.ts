export interface Seat {
  row: string;
  number: number;
  seatId: string;
}

export interface IBookingResponse {
  bookingId: number;
  bookingTime: string;
  customerId: number;
  movieId: number;
  numberOfSeats: number;
  paymentType?: any;
  seats: Seat[];
  showId: number;
  status: string;
  totalPrice: number;
}
