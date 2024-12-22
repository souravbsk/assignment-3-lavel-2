import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { User } from '../User/user.model';
import { Blog } from '../Blog/blog.model';

const blockUserFromDB = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  await User.findByIdAndUpdate(
    userId,
    {
      isBlocked: true,
    },
    {
      new: true,
    },
  );
  return null;
};

const deleteBlogFromDB = async (id: string) => {
  const isBlogExist = await Blog.findById(id);
  if (!isBlogExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  const blog = await Blog.findByIdAndDelete(id);
  return blog;
};

export const AdminServices = {
  blockUserFromDB,
  deleteBlogFromDB,
};
