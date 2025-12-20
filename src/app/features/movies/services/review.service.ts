// reviews/services/review.service.ts

import { Injectable } from '@angular/core';
import { API_KEYS } from '../../../core/constants/appAPIs';
import { IReviewResponse } from '../interfaces/IReviewResponse';
import { Basehttp } from '../../../core/services/baseHttp';
import { IReviewRequest } from '../interfaces/IReviewRequest';

@Injectable({ providedIn: 'root' })
export class ReviewService extends Basehttp {
  addReview(review: IReviewRequest) {
    return this.http.post(API_KEYS.addReview, review);
  }

  getMovieReviews(movieName: string) {
    return this.http.get<IReviewResponse[]>(API_KEYS.getMovieReviews(movieName));
  }
}
