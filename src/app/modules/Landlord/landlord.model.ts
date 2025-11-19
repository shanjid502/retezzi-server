// landlord.model.ts
import { Schema, model } from 'mongoose';
import { TLandlord, LandlordModel } from './landlord.interface';

const nameSchema = new Schema({
  firstName: { type: String, required: [true, 'First Name is required'] },
  lastName: { type: String, required: [true, 'Last Name is required'] },
});

const addressSchema = new Schema(
  {
    villaName: { type: String, required: [true, 'VillaName is required'] },
    division: { type: String, required: [true, 'Division is required'] },
    district: { type: String, required: [true, 'District is required'] },
    policeStation: {
      type: String,
      required: [true, 'Police Station is required'],
    },
    areaName: { type: String, required: [true, 'Area Name is required'] },
    roadName: { type: String, required: [true, 'Road Name is required'] },
    postalCode: { type: String, required: [true, 'Postal Code is required'] },
    phoneNumber: { type: String },
    houseNumber: { type: String },
    floorNumber: { type: String },
    directions: { type: String },
    // flatNumber: { type: String, required: [true, 'Flat Number is required'] },
    flatNumber: { type: String },
    block: { type: String },
    landmark: { type: String, required: [true, 'Landmark is required'] },
  },
  { _id: false },
);

const landlordSchema = new Schema<TLandlord, LandlordModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    name: nameSchema,
    email: {
      type: String,
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address',
      ],
    },
    address: { type: addressSchema, required: true },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: [true, 'Gender is required'],
    },
    profilePicture: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

/* ---------- static helpers ---------- */
landlordSchema.statics.isUserExists = async function (id: string) {
  return await this.findOne({ id, isDeleted: false }).populate('user');
};

export const Landlord = model<TLandlord, LandlordModel>(
  'Landlord',
  landlordSchema,
);
