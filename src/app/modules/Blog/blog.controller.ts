import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { blogServices } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const result = await blogServices.createBlogIntoDB(req.body, req.user);

  const blogResult = {
    _id: result._id,
    title: result.title,
    content: result.content,
    author: result.author,
  };
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Blog created successfully',
    success: true,
    data: blogResult,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const result = await blogServices.updateBlogIntoDB(
    req.params.id,
    req.body,
    req.user,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Blog updated successfully',
    success: true,
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  await blogServices.deleteBlogIntoDB(req.params.id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Blog deleted successfully',
    success: true,
  });
});

const allBlogs = catchAsync(async (req, res) => {
  const result = await blogServices.getAllBlogsIntoDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blogs fetched successfully',
    data: result,
  });
});

export const blogControllers = {
  createBlog,
  updateBlog,
  deleteBlog,
  allBlogs,
};
