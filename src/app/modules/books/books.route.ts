import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookValidation } from './books.validation';
import { BookController } from './books.controller';

const router = express.Router();

router
  .route('/')
  .get(BookController.getAllBooks)
  .post(
    validateRequest(BookValidation.createBookZodSchema),
    BookController.createBook
  );

router
  .route('/add-review/:id')
  .post(
    validateRequest(BookValidation.addReviewZodSchema),
    BookController.addReview
  );

router
  .route('/mark-as-read/:id')
  .patch(
    validateRequest(BookValidation.markAsReadstZodSchema),
    BookController.markAsRead
  );

router
  .route('/:id')
  .get(BookController.getBookById)
  .patch(
    validateRequest(BookValidation.updateBookZodSchema),
    BookController.updateBook
  )
  .delete(BookController.deleteBook);

export const BookRoutes = router;
