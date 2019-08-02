import express from 'express';

import * as reviewController from '../controllers/review.controller';
import { protect, restrictTo } from '../controllers/auth.controller';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(protect, restrictTo('user'), reviewController.createReview);

router.route('/:id').delete(reviewController.deleteReview);

export default router;