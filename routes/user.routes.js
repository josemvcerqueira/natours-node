import express from 'express';

import * as userControllers from '../controllers/user.controllers';
import * as authControllers from '../controllers/authController';

const router = express.Router();

router.post('/signup', authControllers.signup);
router.post('/signin', authControllers.signin);
router.post('/forgotPassword', authControllers.forgotPassword);
router.post('/resetPassword', authControllers.resetPassword);

router
  .route('/')
  .get(userControllers.getAllUsers)
  .post(userControllers.createUser);

router
  .route('/:id')
  .get(userControllers.getUser)
  .patch(userControllers.updateUser)
  .delete(userControllers.deleteUser);

export default router;
