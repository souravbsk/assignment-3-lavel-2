import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TUser } from '../User/user.interface';
import { TLoginUser } from './auth.interface';
import { User } from '../User/user.model';
import { createToken } from './auth.utils';
import config from '../../config';

const createUserIntoDB = async (payload: TUser) => {
  // check if user exist or not
  const isUserExist = await User.isUserExistByEmail(payload.email);
  if (isUserExist) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'User already exist with this email',
    );
  }
  const result = User.create(payload);
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  const isUserExist = await User.isUserExistByEmail(payload.email);
  if (!isUserExist) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }

  const isBlocked = isUserExist.isBlocked;
  if (isBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, 'User is blocked');
  }

  // check password is correct or not

  if (
    !(await User.isPasswordMatched(payload?.password, isUserExist?.password))
  ) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }

  const jwtPayload = {
    email: isUserExist.email,
    role: isUserExist.role,
  };

  // token generation
  const accessToken = createToken(
    jwtPayload,
    config.jwtSecret as string,
    config.jwtAccessExpireIn as string,
  );
  return {
    token: accessToken,
  };
};

export const authServices = {
  createUserIntoDB,
  loginUser,
};
