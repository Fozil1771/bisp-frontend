export interface IUser {
  username: string;
  email: string;
  password: string;
  userType: string;
}

export interface IAuthState {
  auth: {
    isAuthenticated: boolean;
    user: IUser;
  };
}