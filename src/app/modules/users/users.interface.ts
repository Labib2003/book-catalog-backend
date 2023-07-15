import { Model } from 'mongoose';

export type IUser = {
  name: string;
  password: string;
  email: string;
};

//created an instance method
export type IUserMethods = object;

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;

export type IUserFilters = {
  search?: string;
};
