import express from 'express';

import * as viewController from '../controllers/view.controller';
import { isLoggedIn, protect } from '../controllers/auth.controller';
import { createBookingCheckout } from '../controllers/booking.controller';

const router = express.Router();

router.get('/', createBookingCheckout, isLoggedIn, viewController.getOverview);
router.get('/tour/:slug', isLoggedIn, viewController.getTour);
router.get('/signin', isLoggedIn, viewController.getLoginForm);
router.get('/me', protect, viewController.getAccount);
router.get('/my-tours', protect, viewController.getMyTours);

export default router;
