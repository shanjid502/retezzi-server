import { Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import { USER_ROLE, USER_STATUS } from './user.constant';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address',
      ],
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
      match: [
        /^(?:\+88|88)?(01[3-9]\d{8})$/,
        'Please enter a valid Bangladeshi mobile number',
      ],
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    lastPasswordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: USER_ROLE,
    },

    status: {
      type: String,
      enum: USER_STATUS,
      default: USER_STATUS.inProgress,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});
