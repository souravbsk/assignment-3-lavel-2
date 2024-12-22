import { z } from 'zod';

const createBlogValidation = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title Is Required' }).trim(),
    content: z.string({ required_error: 'Content Is Required' }).trim(),
  }),
});
const updateBlogValidation = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title Is Required' }).trim().optional(),
    content: z
      .string({ required_error: 'Content Is Required' })
      .trim()
      .optional(),
  }),
});

export const BlogValidations = {
  createBlogValidation,
  updateBlogValidation,
};
