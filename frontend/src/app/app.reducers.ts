import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects } from './Auth/effects/auth.effects';
import * as AuthReducer from './Auth/reducers';
import { CategoriesEffects } from './Category/effects';
import * as CategoriesReducer from './Category/reducers';
import { PostsEffects } from './Post/effects';
import * as PostsReducer from './Post/reducers';
import { UserEffects } from './User/effects/user.effects';
import * as UserReducer from './User/reducers';

export interface AppState {
  auth: AuthReducer.AuthState;
  user: UserReducer.UserState;
  categories: CategoriesReducer.CategoriesState;
  posts: PostsReducer.PostsState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: AuthReducer.authReducer,
  user: UserReducer.userReducer,
  categories: CategoriesReducer.categoriesReducer,
  posts: PostsReducer.postsReducer
};

export const EffectsArray: any[] = [
  AuthEffects,
  UserEffects,
  CategoriesEffects,
  PostsEffects
];
