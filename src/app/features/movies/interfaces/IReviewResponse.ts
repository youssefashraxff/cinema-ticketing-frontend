// reviews/interfaces/IReview.ts
export interface IReviewResponse {
  reviewId?: number;
  movieName: string;
  customerId: number;
  rating: number; // 1–5
  comment: string;
}
