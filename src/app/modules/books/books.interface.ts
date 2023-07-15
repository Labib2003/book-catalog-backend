import { Model, Types } from 'mongoose';
import { IUser } from '../users/users.interface';

export type IBook = {
  title: string;
  author: Types.ObjectId | IUser;
  genre: string;
  reviews: {
    by: Types.ObjectId | IUser;
    text: string;
  }[];
  readers: Types.ObjectId[];
};
export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
  search?: string;
  genre?: string;
  year?: string;
};

export type IBookReview = {
  by: Types.ObjectId | IUser;
  text: string;
};
