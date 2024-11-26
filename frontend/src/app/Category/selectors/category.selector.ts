import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoriesState } from '../reducers';

const selectCategoriesState =
  createFeatureSelector<CategoriesState>('categories');

export const selectCategoriesStateLoading = createSelector(
  selectCategoriesState,
  (state) => {
    return state.loading;
  }
);

export const selectCategories = createSelector(
  selectCategoriesState,
  (state) => {
    return state.categories;
  }
);

export const selectCategory = createSelector(selectCategoriesState, (state) => {
  return state.category;
});
