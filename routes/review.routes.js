import express from 'express';

import * as reviewController from '../controllers/review.controller';
import { protect, restrictTo } from '../controllers/auth.controller';

const router = express.Router({ mergeParams: true });

router.use(protect);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview,
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(restrictTo('user', 'admin'), reviewController.updateReview)
  .delete(restrictTo('user', 'admin'), reviewController.deleteReview);

export default router;
