import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../reducers';

const selectUserState = createFeatureSelector<UserState>('user');

export const selectUserStateLoading = createSelector(
  selectUserState,
  (state) => {
    return state.loading;
  }
);

export const selectUser = createSelector(selectUserState, (state) => {
  return state.user;
});
