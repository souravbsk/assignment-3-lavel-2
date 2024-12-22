import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidations } from './blog.validation';
import { blogControllers } from './blog.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

// do not use auth guard

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(BlogValidations.createBlogValidation),
  blogControllers.createBlog,
);

router.patch(
  '/:id',
  auth(USER_ROLE.user),
  validateRequest(BlogValidations.updateBlogValidation),
  blogControllers.updateBlog,
);
router.delete('/:id', auth(USER_ROLE.user), blogControllers.deleteBlog);
router.get('/', blogControllers.allBlogs);

// do not use auth guard
export const blogRouter = router;
