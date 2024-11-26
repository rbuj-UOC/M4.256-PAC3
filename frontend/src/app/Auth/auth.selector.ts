import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './reducers';

const selectAuth = createFeatureSelector<AuthState>('auth');

export const selectLoading = createSelector(selectAuth, (state) => {
  return state.loading;
});
