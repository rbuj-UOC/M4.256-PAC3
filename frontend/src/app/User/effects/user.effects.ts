import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, finalize, map } from 'rxjs/operators';
import { SharedService } from '../../Shared/Services/shared.service';
import * as UserActions from '../actions';
import { UserService } from '../services/user.service';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private router = inject(Router);
  private sharedService = inject(SharedService);

  private responseOK: boolean;
  private errorResponse: any;
  register$: any;
  registerSuccess$: any;
  registerFailure$: any;
  updateUser$: any;
  updateUserSuccess$: any;
  updateUserFailure$: any;
  getUserById$: any;
  getUserByIdFailure$: any;

  constructor() {
    this.responseOK = false;

    this.register$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.register),
        exhaustMap(({ user }) =>
          this.userService.register(user).pipe(
            map((user) => {
              return UserActions.registerSuccess({ user: user });
            }),
            catchError((error) => {
              return of(UserActions.registerFailure({ payload: error }));
            }),
            finalize(async () => {
              await this.sharedService.managementToast(
                'registerFeedback',
                this.responseOK,
                this.errorResponse
              );

              if (this.responseOK) {
                this.router.navigateByUrl('home');
              }
            })
          )
        )
      );
    });

    this.registerSuccess$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(UserActions.registerSuccess),
          map(() => {
            this.responseOK = true;
          })
        );
      },
      { dispatch: false }
    );

    this.registerFailure$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(UserActions.registerFailure),
          map((error) => {
            this.responseOK = false;
            this.errorResponse = error.payload.error;
            this.sharedService.errorLog(error.payload.error);
          })
        );
      },
      { dispatch: false }
    );

    this.updateUser$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.updateUser),
        exhaustMap(({ userId, user }) =>
          this.userService.updateUser(userId, user).pipe(
            map((user) => {
              return UserActions.updateUserSuccess({
                userId: userId,
                user: user
              });
            }),
            catchError((error) => {
              return of(UserActions.updateUserFailure({ payload: error }));
            }),
            finalize(async () => {
              await this.sharedService.managementToast(
                'profileFeedback',
                this.responseOK,
                this.errorResponse
              );
            })
          )
        )
      );
    });

    this.updateUserSuccess$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(UserActions.updateUserSuccess),
          map(() => {
            this.responseOK = true;
          })
        );
      },
      { dispatch: false }
    );

    this.updateUserFailure$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(UserActions.updateUserFailure),
          map((error) => {
            this.responseOK = false;
            this.errorResponse = error.payload.error;
            this.sharedService.errorLog(error.payload.error);
          })
        );
      },
      { dispatch: false }
    );

    this.getUserById$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.getUserById),
        exhaustMap(({ userId }) =>
          this.userService.getUserById(userId).pipe(
            map((user) => {
              return UserActions.getUserByIdSuccess({
                userId: userId,
                user: user
              });
            }),
            catchError((error) => {
              return of(UserActions.getUserByIdFailure({ payload: error }));
            })
          )
        )
      );
    });

    this.getUserByIdFailure$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(UserActions.getUserByIdFailure),
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
}
