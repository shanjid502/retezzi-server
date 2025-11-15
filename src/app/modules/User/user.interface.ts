import { Model } from 'mongoose';
import { TUserRole, TUserStatus } from './user.constant';

export interface TUser {
  id: string;
  email?: string;
  role: TUserRole;
  status: TUserStatus;
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExistByCustomId(id: string): Promise<TUser>;

  isPasswordMatched(
    plainTextPass: string,
    hashedPass: string,
  ): Promise<boolean>;

  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimeStamp: Date,
    jwtIssuedTimeStamp: number,
  ): boolean;
}
