import mongoose from 'mongoose';
import { TLandlord } from '../Landlord/landlord.interface';
import { TUser } from './user.interface';
import { User } from './user.model';
import { Landlord } from '../Landlord/landlord.model';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

const createLandlordIntoDB = async (password: string, payload: TLandlord) => {
  //TODO: add an otp verification logic

  const userData: Partial<TUser> = {};

  userData.password = password;
  userData.role = 'landlord';
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    payload.user = newUser[0]._id;

    const landlord = await Landlord.create([payload], { session });
    if (!landlord.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create landlord');
    }

    await session.commitTransaction();
    await session.endSession();
    return landlord;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to create landlord',
      error instanceof Error ? error.message : 'Unknown error',
    );
  }
};

export const UserService = {
  createLandlordIntoDB,
};
