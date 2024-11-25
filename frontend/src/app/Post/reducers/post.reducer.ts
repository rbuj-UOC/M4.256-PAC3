import { Action, createReducer, on } from '@ngrx/store';
import {
  createPost,
  createPostFailure,
  createPostSuccess,
  deletePost,
  deletePostFailure,
  deletePostSuccess,
  dislikePost,
  dislikePostFailure,
  dislikePostSuccess,
  getPostById,
  getPostByIdFailure,
  getPostByIdSuccess,
  getPosts,
  getPostsByUserId,
  getPostsByUserIdFailure,
  getPostsByUserIdSuccess,
  getPostsFailure,
  getPostsSuccess,
  likePost,
  likePostFailure,
  likePostSuccess,
  updatePost,
  updatePostFailure,
  updatePostSuccess
} from '../actions';
import { PostDTO } from '../models/post.dto';

export interface PostsState {
  posts: PostDTO[];
  post: PostDTO;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: PostsState = {
  posts: new Array<PostDTO>(),
  post: new PostDTO('', '', 0, 0, new Date()),
  loading: false,
  loaded: false,
  error: null
};

const _postsReducer = createReducer(
  initialState,
  on(getPostsByUserId, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(getPostsByUserIdSuccess, (state, action) => ({
    ...state,
    posts: action.posts,
    loading: false,
    loaded: true,
    error: null
  })),
  on(getPostsByUserIdFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload }
  })),
  on(deletePost, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(deletePostSuccess, (state, { postId }) => ({
    ...state,
    posts: [...state.posts.filter((post) => post.postId !== postId)],
    loading: false,
    loaded: true,
    error: null
  })),
  on(deletePostFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload }
  })),
  on(getPostById, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(getPostByIdSuccess, (state, action) => ({
    ...state,
    post: action.post,
    loading: false,
    loaded: true,
    error: null
  })),
  on(getPostByIdFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload }
  })),
  on(createPost, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(createPostSuccess, (state, action) => ({
    ...state,
    post: action.post,
    loading: false,
    loaded: true,
    error: null
  })),
  on(createPostFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload }
  })),
  on(updatePost, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(updatePostSuccess, (state, action) => ({
    ...state,
    post: action.post,
    loading: false,
    loaded: true,
    error: null
  })),
  on(updatePostFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload }
  })),
  on(getPosts, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(getPostsSuccess, (state, action) => ({
    ...state,
    posts: action.posts,
    loading: false,
    loaded: true,
    error: null
  })),
  on(getPostsFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload }
  })),
  on(likePost, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(likePostSuccess, (state, action) => ({
    ...state,
    posts: [
      ...state.posts.map((post) => {
        if (post.postId === action.postId) {
          return { ...post, num_likes: post.num_likes + 1 };
        } else {
          return post;
        }
      })
    ],
    loading: false,
    loaded: true,
    error: null
  })),
  on(likePostFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload }
  })),
  on(dislikePost, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(dislikePostSuccess, (state, action) => ({
    ...state,
    posts: [
      ...state.posts.map((post) => {
        if (post.postId === action.postId) {
          return { ...post, num_dislikes: post.num_dislikes + 1 };
        } else {
          return post;
        }
      })
    ],
    loading: false,
    loaded: true,
    error: null
  })),
  on(dislikePostFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload }
  }))
);

export function postsReducer(
  state: PostsState | undefined,
  action: Action
): PostsState {
  return _postsReducer(state, action);
}
