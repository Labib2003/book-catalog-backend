export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  name: string;
  email: string;
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  name: string;
  email: string;
  accessToken: string;
};
