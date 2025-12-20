export interface MovieCategory {
  type: string;
  ageRestriction: number;
}

export interface Movie {
  movieDescription: string;
  ageRestriction: number;
  duration: number;
  horizontalPoster: string;
  language: string;
  movieCategory: MovieCategory;
  movieId: number;
  name: string;
  rating: number;
  trailerURL: string;
  type: string;
  verticalPoster: string;
}

export interface Hall {
  hallId: number;
  capacity: number;
  hallType: string;
  seatPrice: number;
  capacityOfSeats: number;
  hallStatus: string;
  halltype: string;
  status: string;
}

export interface IShowResponse {
  showId: number;
  movie: Movie;
  hall: Hall;
  startTime: string;
  endTime: string;
}
