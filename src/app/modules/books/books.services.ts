import { SortOrder } from 'mongoose';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import { paginationHelpers } from '../../../shared/paginationHelpers';
import { bookSearchableFields } from './books.constants';
import { IBook, IBookFilters, IBookReview } from './books.interface';
import { Book } from './books.model';

const createBook = async (payload: IBook): Promise<IBook | null> => {
  const result = await await Book.create(payload);
  return result;
};

const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBook[]>> => {
  const { search, year, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (search) {
    andConditions.push({
      $or: bookSearchableFields.map(field => ({
        [field]: {
          $regex: search,
          $options: 'i',
        },
      })),
    });
  }

  if (year) {
    console.log(year);
    andConditions.push({
      $and: [
        {
          createdAt: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      ],
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Book.find(whereConditions)
    .populate('author')
    .populate('reviews.by')
    .populate('readers')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Book.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getBookById = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id)
    .populate('author')
    .populate('reviews.by')
    .populate('readers');
  return result;
};

const updateBook = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const result = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
    .populate('author')
    .populate('reviews.by')
    .populate('readers');
  return result;
};

const deleteBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findByIdAndDelete(id);
  return result;
};

const addReview = async (
  id: string,
  payload: IBookReview
): Promise<IBook | null> => {
  const result = await Book.findOneAndUpdate(
    { _id: id },
    { $push: { reviews: payload } },
    {
      new: true,
    }
  );
  return result;
};

const markAsRead = async (
  id: string,
  userId: string
): Promise<IBook | null> => {
  const result = await Book.findOneAndUpdate(
    { _id: id },
    { $addToSet: { readers: userId } },
    {
      new: true,
    }
  )
    .populate('author')
    .populate('reviews.by')
    .populate('readers');
  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  deleteBook,
  getBookById,
  updateBook,
  addReview,
  markAsRead,
};
