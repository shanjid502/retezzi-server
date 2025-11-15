import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catrchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';

const createLandlord = catchAsync(async (req, res) => {
  const { password, landlord: landlordPayload } = req.body;
  const result = await UserService.createLandlordIntoDB(
    password,
    landlordPayload,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Landlord created successfully',
    data: result,
  });
});

export const UserController = {
  createLandlord,
};
