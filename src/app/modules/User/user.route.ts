import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createLandlordValidationSchema } from '../Landlord/landlord.validation';
import { UserController } from './user.controller';

const router = Router();

router.post(
  '/create-landlord',
  validateRequest(createLandlordValidationSchema),
  UserController.createLandlord,
);
