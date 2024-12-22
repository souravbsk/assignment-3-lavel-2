import { Router } from 'express';
import { authRouter } from '../modules/Auth/auth.route';
import { blogRouter } from '../modules/Blog/blog.route';
import { adminRouter } from '../modules/Admin/admin.route';

const router = Router();
const moduleRoutes = [
  {
    path: '/auth',
    router: authRouter,
  },
  {
    path: '/blogs',
    router: blogRouter,
  },
  {
    path: '/admin',
    router: adminRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
