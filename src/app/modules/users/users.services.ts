import { SortOrder } from 'mongoose';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import { paginationHelpers } from '../../../shared/paginationHelpers';
import { userSearchableFields } from './users.constants';
import { IUser, IUserFilters } from './users.interface';
import { User } from './users.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const result = await User.create(user);
  return result;
};

const getUsers = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IUser[] | []>> => {
  const { search, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (search) {
    console.log(search);
    andConditions.push({
      $or: userSearchableFields.map(field => ({
        [field]: {
          $regex: search,
          $options: 'i',
        },
      })),
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

  const result = await User.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getUserById = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);
  return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  if (payload.password) {
    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    // Update the document with the new payload
    user.set(payload);

    // Manually trigger the pre-save hook
    user.password = payload.password as string; // Assuming the new password is present in the payload
    await user.save();

    // Retrieve the updated document
    const result = await User.findOne({ _id: id });

    return result;
  } else {
    const result = await User.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });

    return result;
  }
};

export const UserService = {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
};
