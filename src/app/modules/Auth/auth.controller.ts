import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { authServices } from './auth.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createRegister = catchAsync(async (req: Request, res: Response) => {
  // code to create user
  const result = await authServices.createUserIntoDB(req.body);
  const { _id, name, email } = result;

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User registered successfully',
    success: true,
    data: {
      _id,
      name,
      email,
    },
  });
});
const login = catchAsync(async (req: Request, res: Response) => {
  // code to login user
  const result = await authServices.loginUser(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Login successful',
    success: true,
    data: result,
  });
});

export const authControllers = {
  createRegister,
  login,
};
