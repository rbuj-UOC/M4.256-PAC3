import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { CategoryDTO } from '../models/category.dto';

export const getCategoriesByUserId = createAction(
  '[CategoriesList Page] Get categories list',
  props<{ userId: string }>()
);
export const getCategoriesByUserIdSuccess = createAction(
  '[CategoriesList Page] Get categories list Success',
  props<{ categories: CategoryDTO[] }>()
);

export const getCategoriesByUserIdFailure = createAction(
  '[CategoriesList Page] Get categories list Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const deleteCategory = createAction(
  '[CategoriesList Page] Delete category',
  props<{ categoryId: string }>()
);
export const deleteCategorySuccess = createAction(
  '[CategoriesList Page] Delete category Success',
  props<{ categoryId: string }>()
);

export const deleteCategoryFailure = createAction(
  '[CategoriesList Page] Delete category Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const getCategoryById = createAction(
  '[CategoryForm Page] Get category',
  props<{ categoryId: string }>()
);
export const getCategoryByIdSuccess = createAction(
  '[CategoryForm Page] Get category Success',
  props<{ category: CategoryDTO }>()
);

export const getCategoryByIdFailure = createAction(
  '[CategoryForm Page] Get category Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const createCategory = createAction(
  '[CategoryForm Page] Create category',
  props<{ category: CategoryDTO }>()
);
export const createCategorySuccess = createAction(
  '[CategoryForm Page] Create category Success',
  props<{ category: CategoryDTO }>()
);

export const createCategoryFailure = createAction(
  '[CategoryForm Page] Create category Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const updateCategory = createAction(
  '[CategoryForm Page] Update category',
  props<{ categoryId: string; category: CategoryDTO }>()
);
export const updateCategorySuccess = createAction(
  '[CategoryForm Page] Update category Success',
  props<{ categoryId: string; category: CategoryDTO }>()
);

export const updateCategoryFailure = createAction(
  '[CategoryForm Page] Update category Failure',
  props<{ payload: HttpErrorResponse }>()
);
