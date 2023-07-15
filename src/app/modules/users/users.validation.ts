import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z
    .object({
      name: z.string({
        required_error: 'First name is required',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email('Invalid email'),
      password: z.string({
        required_error: 'Password is required',
      }),
    })
    .strict(),
});

const updateUserZodSchema = z.object({
  body: z
    .object({
      name: z.string({}).optional(),
      password: z.string({}).optional(),
    })
    .strict(),
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
