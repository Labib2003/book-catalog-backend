import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../users/users.model';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import { jwtHelpers } from '../../../shared/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  //check user exists
  const user = await User.findOne(
    { email: email },
    { name: 1, email: 1, password: 1 }
  ).lean();

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists');
  }

  const passwordMatched = await bcrypt.compare(password, user.password);
  if (user.password && !passwordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  // const { email, name } = user;
  // create access token(shortlife), refresh token(longlife)
  //access token

  const accessToken = jwtHelpers.createToken(
    { email: user.email, name: user.name },
    config.jwt.secret as Secret,
    { expiresIn: config.jwt.expires_in }
  );

  //refresh token
  const refreshToken = jwtHelpers.createToken(
    { email: user.email, name: user.name },
    config.jwt.refresh_secret as Secret,
    { expiresIn: config.jwt.refresh_expires_in }
  );

  return {
    name: user.name,
    email: user.email,
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token');
  }

  const { email } = verifiedToken;

  //check user exists
  const user = await User.findOne({ email: email }).lean();
  //if user does not exists
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists');
  }

  //generate new token
  const accessToken = jwtHelpers.createToken(
    { name: user.name, email: user.email },
    config.jwt.secret as Secret,
    { expiresIn: config.jwt.expires_in }
  );

  return {
    name: user.name,
    email: user.email,
    accessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
