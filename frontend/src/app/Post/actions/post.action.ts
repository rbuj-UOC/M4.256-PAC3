import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { PostDTO } from '../models/post.dto';

export const getPostsByUserId = createAction(
  '[PostsList Page] Get posts list',
  props<{ userId: string }>()
);
export const getPostsByUserIdSuccess = createAction(
  '[PostsList Page] Get posts list Success',
  props<{ posts: PostDTO[] }>()
);

export const getPostsByUserIdFailure = createAction(
  '[PostsList Page] Get posts list Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const deletePost = createAction(
  '[PostsList Page] Delete post',
  props<{ postId: string }>()
);
export const deletePostSuccess = createAction(
  '[PostsList Page] Delete post Success',
  props<{ postId: string }>()
);

export const deletePostFailure = createAction(
  '[PostsList Page] Delete post Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const getPostById = createAction(
  '[PostForm Page] Get post',
  props<{ postId: string }>()
);
export const getPostByIdSuccess = createAction(
  '[PostForm Page] Get post Success',
  props<{ post: PostDTO }>()
);

export const getPostByIdFailure = createAction(
  '[PostForm Page] Get post Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const createPost = createAction(
  '[PostForm Page] Create post',
  props<{ post: PostDTO }>()
);
export const createPostSuccess = createAction(
  '[PostForm Page] Create post Success',
  props<{ post: PostDTO }>()
);

export const createPostFailure = createAction(
  '[PostForm Page] Create post Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const updatePost = createAction(
  '[PostForm Page] Update post',
  props<{ postId: string; post: PostDTO }>()
);
export const updatePostSuccess = createAction(
  '[PostForm Page] Update post Success',
  props<{ postId: string; post: PostDTO }>()
);

export const updatePostFailure = createAction(
  '[PostForm Page] Update post Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const getPosts = createAction('[Home Page] Get posts list');
export const getPostsSuccess = createAction(
  '[Home Page] Get posts list Success',
  props<{ posts: PostDTO[] }>()
);

export const getPostsFailure = createAction(
  '[Home Page] Get posts list Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const likePost = createAction(
  '[Home Page] Like post',
  props<{ postId: string }>()
);
export const likePostSuccess = createAction(
  '[Home Page] Like post Success',
  props<{ postId: string }>()
);

export const likePostFailure = createAction(
  '[Home Page] Like post Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const dislikePost = createAction(
  '[Home Page] Dislike post',
  props<{ postId: string }>()
);
export const dislikePostSuccess = createAction(
  '[Home Page] Dislike post Success',
  props<{ postId: string }>()
);

export const dislikePostFailure = createAction(
  '[Home Page] Dislike post Failure',
  props<{ payload: HttpErrorResponse }>()
);
