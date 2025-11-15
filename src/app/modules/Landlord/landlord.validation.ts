import z from 'zod';

const createLandlordUserNameSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required').optional(),
});

const createLandlordAddressSchema = z.object({
  VillaName: z.string().min(1, 'VillaName is required'),
  Division: z.string().min(1, 'Division is required'),
  District: z.string().min(1, 'District is required'),
  PoliceStation: z.string().min(1, 'Police Station is required'),
  areaName: z.string().min(1, 'Area Name is required'),
  roadName: z.string().min(1, 'Road Name is required'),
  postalCode: z.string().min(1, 'Postal Code is required'),
  secondaryPhoneNumber: z.string().optional(),
  houseNumber: z.string().optional(),
  floorNumber: z.string().optional(),
  directions: z.string().optional(),
  flatNumber: z.string().min(1, 'Flat Number is required'),
  block: z.string().min(1, 'Block is required'),
  landmark: z.string().min(1, 'Landmark is required'),
});

export const createLandlordValidationSchema = z.object({
  body: z.object({
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    landlord: z.object({
      name: createLandlordUserNameSchema,
      address: createLandlordAddressSchema,
      gender: z.enum(['male', 'female', 'other'] as const),
      profilePicture: z.string().optional(),
    }),
  }),
});

// ---------- UPDATE SCHEMA (all fields optional) ----------

const updateLandlordAddressSchema = createLandlordAddressSchema.partial();
const updateLandlordUserNameSchema = createLandlordUserNameSchema.partial();

export const updateLandlordValidationSchema = z.object({
  body: z.object({
    password: z.string().min(6).optional(),
    landlord: z
      .object({
        name: updateLandlordUserNameSchema.optional(),
        address: updateLandlordAddressSchema.optional(),
        gender: z.enum(['male', 'female', 'other'] as const).optional(),
        profilePicture: z.string().optional(),
      })
      .optional(),
  }),
});
