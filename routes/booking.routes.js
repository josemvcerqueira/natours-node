import express from 'express';

import * as bookingController from '../controllers/booking.controller';
import * as authController from '../controllers/auth.controller';

const router = express.Router();

router.get(
  '/checkout-session/:tourId',
  authController.protect,
  bookingController.getCheckoutSession,
);

export default router;