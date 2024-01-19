export interface IUser {
  id: string;
  username: string;
  email: string;
  bio: string;
  password: string;
  userType: string;
  token: string;
}

export interface IAuthState {
  auth: {
    isAuthenticated: boolean;
    user: IUser;
  };
}