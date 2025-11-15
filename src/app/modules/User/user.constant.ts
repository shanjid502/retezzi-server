export const USER_ROLE = {
  superAdmin: 'superAdmin',
  admin: 'admin',
  landlord: 'landlord',
  tenant: 'tenant',
  user: 'user',
} as const;

export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export const USER_STATUS = {
  inProgress: 'in-progress',
  active: 'active',
  blocked: 'blocked',
} as const;

export type TUserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS];
