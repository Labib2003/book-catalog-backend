import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './users.validation';
import { UserController } from './users.controller';

const router = express.Router();

router
  .route('/')
  .get(UserController.getUsers)
  .post(
    validateRequest(UserValidation.createUserZodSchema),
    UserController.createUser
  );

router
  .route('/:id')
  .get(UserController.getUserById)
  .delete(UserController.deleteUser)
  .patch(
    validateRequest(UserValidation.updateUserZodSchema),
    UserController.updateUser
  );

router.post;
export const UserRoutes = router;
