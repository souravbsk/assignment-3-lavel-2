import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

const blockUserById = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  await AdminServices.blockUserFromDB(userId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User blocked successfully',
    success: true,
  });
});

const deleteBlogById = catchAsync(async (req, res) => {
  const blogId = req.params.id;
  await AdminServices.deleteBlogFromDB(blogId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Blog deleted successfully',
    success: true,
  });
});

export const AdminControllers = {
  blockUserById,
  deleteBlogById,
};
