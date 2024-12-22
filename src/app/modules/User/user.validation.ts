import { z } from 'zod';

const createUserValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email' }),
    password: z.string({ required_error: 'Password is required' }),
    role: z.enum(['admin', 'user']),
    isBlocked: z.boolean(),
  }),
});

const updateUserValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).optional(),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email' })
      .optional(),
    role: z.enum(['admin', 'user']),
    isBlocked: z.boolean(),
  }),
});

export const userValidations = {
  createUserValidation,
  updateUserValidation,
};
