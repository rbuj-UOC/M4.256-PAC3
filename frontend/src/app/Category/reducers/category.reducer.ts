import { Action, createReducer, on } from '@ngrx/store';
import {
  createCategory,
  createCategoryFailure,
  createCategorySuccess,
  deleteCategory,
  deleteCategoryFailure,
  deleteCategorySuccess,
  getCategoriesByUserId,
  getCategoriesByUserIdFailure,
  getCategoriesByUserIdSuccess,
  getCategoryById,
  getCategoryByIdFailure,
  getCategoryByIdSuccess,
  updateCategory,
  updateCategoryFailure,
  updateCategorySuccess
} from '../actions';
import { CategoryDTO } from '../models/category.dto';

export interface CategoriesState {
  categories: CategoryDTO[];
  category: CategoryDTO;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: CategoriesState = {
  categories: new Array<CategoryDTO>(),
  category: new CategoryDTO('', '', ''),
  loading: false,
  loaded: false,
  error: null
};

const _categoriesReducer = createReducer(
  initialState,
  on(getCategoriesByUserId, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(getCategoriesByUserIdSuccess, (state, action) => ({
    ...state,
    categories: action.categories,
    loading: false,
    loaded: true,
    error: null
  })),
  on(getCategoriesByUserIdFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload }
  })),
  on(deleteCategory, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(deleteCategorySuccess, (state, { categoryId }) => ({
    ...state,
    categories: [
      ...state.categories.filter(
        (category) => category.categoryId !== categoryId
      )
    ],
    loading: false,
    loaded: true,
    error: null
  })),
  on(deleteCategoryFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload }
  })),
  on(getCategoryById, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(getCategoryByIdSuccess, (state, action) => ({
    ...state,
    category: action.category,
    loading: false,
    loaded: true,
    error: null
  })),
  on(getCategoryByIdFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload }
  })),
  on(createCategory, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(createCategorySuccess, (state, action) => ({
    ...state,
    category: action.category,
    loading: false,
    loaded: true,
    error: null
  })),
  on(createCategoryFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload }
  })),
  on(updateCategory, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(updateCategorySuccess, (state, action) => ({
    ...state,
    category: action.category,
    loading: false,
    loaded: true,
    error: null
  })),
  on(updateCategoryFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload }
  }))
);

export function categoriesReducer(
  state: CategoriesState | undefined,
  action: Action
): CategoriesState {
  return _categoriesReducer(state, action);
}
