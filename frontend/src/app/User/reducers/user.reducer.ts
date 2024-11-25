import { Action, createReducer, on } from '@ngrx/store';
import {
  getUserById,
  getUserByIdFailure,
  getUserByIdSuccess,
  register,
  registerFailure,
  registerSuccess,
  updateUser,
  updateUserFailure,
  updateUserSuccess
} from '../actions';
import { UserDTO } from '../models/user.dto';

export interface UserState {
  user: UserDTO;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: UserState = {
  user: new UserDTO('', '', '', '', new Date(), '', ''),
  loading: false,
  loaded: false,
  error: null
};

const _userReducer = createReducer(
  initialState,
  on(register, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(registerSuccess, (state, action) => ({
    ...state,
    user: action.user,
    loading: false,
    loaded: true,
    error: null
  })),
  on(registerFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload }
  })),
  on(updateUser, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(updateUserSuccess, (state, action) => ({
    ...state,
    user: action.user,
    loading: false,
    loaded: true,
    error: null
  })),
  on(updateUserFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload }
  })),
  on(getUserById, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(getUserByIdSuccess, (state, action) => ({
    ...state,
    user: action.user,
    loading: false,
    loaded: true,
    error: null
  })),
  on(getUserByIdFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload }
  }))
);

export function userReducer(
  state: UserState | undefined,
  action: Action
): UserState {
  return _userReducer(state, action);
}
