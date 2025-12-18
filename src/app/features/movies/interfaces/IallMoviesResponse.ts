export interface MovieCategory {
  type: string;
  ageRestriction: number;
}

export interface IallMoviesResponse {
  MovieDescription: string;
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
