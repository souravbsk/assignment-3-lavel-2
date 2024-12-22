import { JwtPayload } from 'jsonwebtoken';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import { User } from '../User/user.model';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { searchableFields } from './blog.constant';

const createBlogIntoDB = async (payload: TBlog, user: JwtPayload) => {
  // check if user exist or not
  const userExist = await User.isUserExistByEmail(user.email);
  if (!userExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  const authorId = (userExist as Record<string, unknown>)._id;

  const result = (await Blog.create({ ...payload, author: authorId })).populate(
    'author',
    '_id name email',
  );

  return result;
};

const updateBlogIntoDB = async (
  id: string,
  payload: Partial<TBlog>,
  user: JwtPayload,
) => {
  const userExist = await User.isUserExistByEmail(user.email);
  if (!userExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  const authorId = (userExist as Record<string, unknown>)._id;
  const blog = await Blog.findByIdAndUpdate(
    id,
    { ...payload, author: authorId },
    { new: true, runValidators: true },
  )
    .populate('author', '_id name email')
    .select('_id title content author');

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  return blog;
};

const deleteBlogIntoDB = async (id: string) => {
  const isBlogExist = await Blog.findById(id);
  if (!isBlogExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  const blog = await Blog.findByIdAndDelete(id);
  return blog;
};

const getAllBlogsIntoDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };
  // filtering
  const excludedFields = ['sortBy', 'search'];
  excludedFields.forEach((field) => delete queryObj[field]);

  // for search query
  let search = '';
  if (query?.search) {
    search = query.search as string;
  }

  // select filed for search

  const searchQuery = Blog.find({
    $or: searchableFields.map((field) => ({
      [field]: { $regex: search, $options: 'i' },
    })),
  });

  let filter = {};
  if (queryObj?.filter) {
    filter = { author: queryObj.filter };
  }

  // for filtering step 2
  const filterQuery = searchQuery
    .find(filter)
    .populate('author', '_id name email');

  // sort step
  let sort = 'createdAt';
  if (query.sortBy) {
    sort = query.sortBy as string;
  }

  let sortOrder: 'asc' | 'desc' = 'desc';

  if (query.sortOrder) {
    sortOrder = query.sortOrder as 'asc' | 'desc';
  }

  const sortedQuery = await filterQuery
    .sort({ [sort]: sortOrder })
    .select('_id title content author');

  // console.log(sortedQuery);
  return sortedQuery;
};
export const blogServices = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogIntoDB,
  getAllBlogsIntoDB,
};
