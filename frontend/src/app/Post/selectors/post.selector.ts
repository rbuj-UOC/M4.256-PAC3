import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from '../reducers';

const selectPostsState = createFeatureSelector<PostsState>('posts');

export const selectPostsStateLoading = createSelector(
  selectPostsState,
  (state) => {
    return state.loading;
  }
);

export const selectPosts = createSelector(selectPostsState, (state) => {
  return state.posts;
});

export const selectPost = createSelector(selectPostsState, (state) => {
  return state.post;
});
