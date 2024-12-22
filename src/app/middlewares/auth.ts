import { StatusCodes } from 'http-status-codes';
import AppError from '../errors/AppError';
import { TUserRole } from '../modules/User/user.interface';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { NextFunction, Request, Response } from 'express';
import { User } from '../modules/User/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token);
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
    }
    const decoded = jwt.verify(token, config.jwtSecret as string) as JwtPayload;
    console.log(decoded);
    const { email, role, iat } = decoded;
    if (!email || !role || !iat) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
    }
    const user = await User.isUserExistByEmail(email);
    if (!user) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
    }

    const isBlocked = user.isBlocked;
    if (isBlocked) {
      throw new AppError(StatusCodes.FORBIDDEN, 'User is blocked');
    }
    console.log(user);

    console.log(requiredRoles.includes(role as TUserRole));
    if (requiredRoles && !requiredRoles.includes(role as TUserRole)) {
      throw new AppError(
        StatusCodes.FORBIDDEN,
        'You are not allowed to access',
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
