import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidations } from './auth.validation';
import { authControllers } from './auth.controller';

const router = express.Router();

// do not use auth guard

router.post(
  '/register',
  validateRequest(AuthValidations.createRegisterValidation),
  authControllers.createRegister,
);

router.post(
  '/login',
  validateRequest(AuthValidations.loginValidation),
  authControllers.login,
);

// do not use auth guard
export const authRouter = router;
