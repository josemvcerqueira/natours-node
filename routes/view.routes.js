import express from 'express';

import * as viewController from '../controllers/view.controller';
import { isLoggedIn } from '../controllers/auth.controller';

const router = express.Router();

router.use(isLoggedIn);

router.get('/', viewController.getOverview);
router.get('/tour/:slug', viewController.getTour);
router.get('/signin', viewController.getLoginForm);

export default router;
