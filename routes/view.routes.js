import express from 'express';

import * as viewController from '../controllers/view.controller';
import { isLoggedIn, protect } from '../controllers/auth.controller';

const router = express.Router();

router.get('/', isLoggedIn, viewController.getOverview);
router.get('/tour/:slug', isLoggedIn, viewController.getTour);
router.get('/signin', isLoggedIn, viewController.getLoginForm);
router.get('/me', protect, viewController.getAccount);

export default router;
