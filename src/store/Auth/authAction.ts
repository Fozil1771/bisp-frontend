// authActions.ts
import { createAction } from '@reduxjs/toolkit';
import { IUser } from '../../types';

export const setUserAction = createAction<IUser>('auth/setUser');
export const logoutAction = createAction('auth/logout');
