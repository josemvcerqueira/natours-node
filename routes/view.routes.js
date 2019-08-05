import express from 'express';

import * as viewController from '../controllers/view.controller';

const router = express.Router();

router.get('/', viewController.getOverview);
router.get('/tour/:slug', viewController.getTour);

export default router;
