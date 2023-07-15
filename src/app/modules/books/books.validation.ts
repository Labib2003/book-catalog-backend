import { z } from 'zod';

const createBookZodSchema = z.object({
  body: z
    .object({
      title: z.string({
        required_error: 'Title is required',
      }),
      author: z.string({
        required_error: 'Author id is required',
      }),
      genre: z.string({
        required_error: 'Genre is required',
      }),
    })
    .strict(),
});

const updateBookZodSchema = z.object({
  body: z
    .object({
      title: z.string({}).optional(),
      genre: z.string({}).optional(),
    })
    .strict(),
});

const addReviewZodSchema = z.object({
  body: z
    .object({
      by: z.string({
        required_error: 'Review by is required',
      }),
      text: z.string({
        required_error: 'Review text is required',
      }),
    })
    .strict(),
});

const markAsReadstZodSchema = z.object({
  body: z
    .object({
      userId: z.string({
        required_error: 'Review by is required',
      }),
    })
    .strict(),
});

export const BookValidation = {
  createBookZodSchema,
  updateBookZodSchema,
  addReviewZodSchema,
  markAsReadstZodSchema,
};
