import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, finalize, map } from 'rxjs/operators';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import * as CategoryActions from '../actions';
import { CategoryService } from '../services/category.service';

@Injectable()
export class CategoriesEffects {
  private responseOK: boolean;
  private errorResponse: any;

  constructor(
    private actions$: Actions,
    private categoryService: CategoryService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.responseOK = false;
  }

  getCategoriesByUserId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoryActions.getCategoriesByUserId),
      exhaustMap(({ userId }) =>
        this.categoryService.getCategoriesByUserId(userId).pipe(
          map((categories) => {
            return CategoryActions.getCategoriesByUserIdSuccess({
              categories: categories
            });
          }),
          catchError((error) => {
            return of(
              CategoryActions.getCategoriesByUserIdFailure({ payload: error })
            );
          })
        )
      )
    );
  });

  getCategoriesByUserIdFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CategoryActions.getCategoriesByUserIdFailure),
        map((error) => {
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      );
    },
    { dispatch: false }
  );

  deleteCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoryActions.deleteCategory),
      exhaustMap(({ categoryId }) =>
        this.categoryService.deleteCategory(categoryId).pipe(
          map(() => {
            return CategoryActions.deleteCategorySuccess({
              categoryId: categoryId
            });
          }),
          catchError((error) => {
            return of(
              CategoryActions.deleteCategoryFailure({ payload: error })
            );
          })
        )
      )
    );
  });

  deleteCategoryFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CategoryActions.deleteCategoryFailure),
        map((error) => {
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      );
    },
    { dispatch: false }
  );

  getCategoryById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoryActions.getCategoryById),
      exhaustMap(({ categoryId }) =>
        this.categoryService.getCategoryById(categoryId).pipe(
          map((category) => {
            return CategoryActions.getCategoryByIdSuccess({
              category: category
            });
          }),
          catchError((error) => {
            return of(
              CategoryActions.getCategoryByIdFailure({ payload: error })
            );
          })
        )
      )
    );
  });

  getCategoryByIdFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CategoryActions.getCategoryByIdFailure),
        map((error) => {
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      );
    },
    { dispatch: false }
  );

  createCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoryActions.createCategory),
      exhaustMap(({ category }) =>
        this.categoryService.createCategory(category).pipe(
          map((category) => {
            return CategoryActions.createCategorySuccess({
              category: category
            });
          }),
          catchError((error) => {
            return of(
              CategoryActions.createCategoryFailure({ payload: error })
            );
          }),
          finalize(async () => {
            await this.sharedService.managementToast(
              'categoryFeedback',
              this.responseOK,
              this.errorResponse
            );

            if (this.responseOK) {
              this.router.navigateByUrl('categories');
            }
          })
        )
      )
    );
  });

  createCategorySuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CategoryActions.createCategorySuccess),
        map(() => {
          this.responseOK = true;
        })
      );
    },
    { dispatch: false }
  );

  createCategoryFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CategoryActions.createCategoryFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      );
    },
    { dispatch: false }
  );

  updateCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoryActions.updateCategory),
      exhaustMap(({ categoryId, category }) =>
        this.categoryService.updateCategory(categoryId, category).pipe(
          map((category) => {
            return CategoryActions.updateCategorySuccess({
              categoryId: categoryId,
              category: category
            });
          }),
          catchError((error) => {
            return of(
              CategoryActions.updateCategoryFailure({ payload: error })
            );
          }),
          finalize(async () => {
            await this.sharedService.managementToast(
              'categoryFeedback',
              this.responseOK,
              this.errorResponse
            );

            if (this.responseOK) {
              this.router.navigateByUrl('categories');
            }
          })
        )
      )
    );
  });

  updateCategorySuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CategoryActions.updateCategorySuccess),
        map(() => {
          this.responseOK = true;
        })
      );
    },
    { dispatch: false }
  );

  updateCategoryFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CategoryActions.updateCategoryFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      );
    },
    { dispatch: false }
  );
}
