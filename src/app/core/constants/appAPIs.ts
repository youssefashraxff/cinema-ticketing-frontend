import { environments } from '../../../environments/environments.dev';

export const API_KEYS = {
  /*  AUTH / USERS  */
  register: `${environments.API_URL}users/register`,
  login: `${environments.API_URL}users/login`,
  getAllUsers: `${environments.API_URL}users`,
  getUserById: (id: number) => `${environments.API_URL}users/${id}`,

  /*  MOVIES  */
  createMovie: `${environments.API_URL}movies`,
  getAllMovies: `${environments.API_URL}movies`,
  getMovieById: (id: number) => `${environments.API_URL}movies/${id}`,
  deleteMovie: (id: number) => `${environments.API_URL}movies/${id}`,

  getMovieByName: (name: string) => `${environments.API_URL}movies/search/name?name=${name}`,

  getMoviesByCategory: (type: string) => `${environments.API_URL}movies/category?type=${type}`,

  searchMoviesByLanguage: (language: string) =>
    `${environments.API_URL}movies/search/language?language=${language}`,

  searchMoviesByDuration: (min: number, max: number) =>
    `${environments.API_URL}movies/search/duration?min=${min}&max=${max}`,

  searchMoviesByRating: (min: number, max: number) =>
    `${environments.API_URL}movies/search/rating?min=${min}&max=${max}`,

  /*  SHOWS  */
  createShow: `${environments.API_URL}shows`,
  getAllShows: `${environments.API_URL}shows`,

  getShowsByMovie: (movieId: number) => `${environments.API_URL}shows/movie/${movieId}`,

  getShowsByHall: (hallId: number) => `${environments.API_URL}shows/hall/${hallId}`,
  getShowById: (id: number) => `${environments.API_URL}shows/${id}`,

  assignShowToHall: `${environments.API_URL}shows/assign/hall`,
  assignMovieToShow: `${environments.API_URL}shows/assign/movie`,

  deleteShow: (id: number) => `${environments.API_URL}shows/${id}`,

  /*  HALLS  */
  createHall: `${environments.API_URL}halls`,
  getAllHalls: `${environments.API_URL}halls`,
  getHallById: (id: number) => `${environments.API_URL}halls/${id}`,

  /*  BOOKINGS  */
  createBooking: `${environments.API_URL}bookings`,
  getBookingById: (id: number) => `${environments.API_URL}bookings/${id}`,

  getBookingsByCustomer: (customerId: number) =>
    `${environments.API_URL}bookings/customer/${customerId}`,

  cancelBooking: (id: number) => `${environments.API_URL}bookings/cancel/${id}`,

  getRemainingSeats: (showId: number) => `${environments.API_URL}shows/${showId}/seats`,

  /*  PAYMENTS  */
  payByCash: `${environments.API_URL}payments/cash`,
  payByCard: `${environments.API_URL}payments/card`,
  payByPaypal: `${environments.API_URL}payments/paypal`,

  /*  REVIEWS  */
  addReview: `${environments.API_URL}reviews`,
  getMovieReviews: (movieName: string) =>
    `${environments.API_URL}reviews/movie?movieName=${movieName}`,

  getAverageRating: (movieName: string) =>
    `${environments.API_URL}reviews/average?movieName=${movieName}`,
};
