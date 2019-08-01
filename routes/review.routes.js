import express from 'express';

import * as reviewController from '../controllers/review.controller';
import { protect, restrictTo } from '../controllers/auth.controller';

const router = express.Router();

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(protect, restrictTo('user'), reviewController.createReview);

export default router;
