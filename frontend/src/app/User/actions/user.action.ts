import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { UserDTO } from '../models/user.dto';

export const register = createAction(
  '[Register Page] Register new user',
  props<{ user: UserDTO }>()
);
export const registerSuccess = createAction(
  '[Register Page] Register new user Success',
  props<{ user: UserDTO }>()
);

export const registerFailure = createAction(
  '[Register Page] Register new user Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const updateUser = createAction(
  '[Profile Page] Update User',
  props<{ userId: string; user: UserDTO }>()
);
export const updateUserSuccess = createAction(
  '[Profile Page] Update User Success',
  props<{ userId: string; user: UserDTO }>()
);

export const updateUserFailure = createAction(
  '[Profile Page] Update User Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const getUserById = createAction(
  '[Profile Page] Get user by ID',
  props<{ userId: string }>()
);
export const getUserByIdSuccess = createAction(
  '[Profile Page] Get user by ID Success',
  props<{ userId: string; user: UserDTO }>()
);

export const getUserByIdFailure = createAction(
  '[Profile Page] Get user by ID Failure',
  props<{ payload: HttpErrorResponse }>()
);
