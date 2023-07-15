import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IBook } from './books.interface';
import httpStatus from 'http-status';
import { BookService } from './books.services';
import pick from '../../../shared/pick';
import { booksFilterableFields } from './books.constants';
import { paginationFields } from '../../../shared/paginationFields';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const bookData = req.body;
  const result = await BookService.createBook(bookData);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created successfully',
    data: result,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, booksFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await BookService.getAllBooks(filters, paginationOptions);

  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getBookById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.getBookById(id);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book fetched successfully',
    data: result,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.updateBook(id, req.body);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully',
    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.deleteBook(id);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully',
    data: result,
  });
});

const addReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.addReview(id, req.body);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review added successfully',
    data: result,
  });
});

const markAsRead = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.body.userId;
  const result = await BookService.markAsRead(id, userId);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book marked as read successfully',
    data: result,
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  getBookById,
  deleteBook,
  updateBook,
  addReview,
  markAsRead,
};
