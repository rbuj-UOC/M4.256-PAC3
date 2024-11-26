import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers';

const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthStateLoading = createSelector(
  selectAuthState,
  (state) => {
    return state.loading;
  }
);

export const selectAccessToken = createSelector(selectAuthState, (state) => {
  return state.credentials.access_token;
});

export const selectCredentials = createSelector(selectAuthState, (state) => {
  return state.credentials;
});

export const selectUserId = createSelector(selectAuthState, (state) => {
  return state.credentials.user_id;
});
