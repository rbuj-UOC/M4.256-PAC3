import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, finalize, map } from 'rxjs/operators';
import { SharedService } from '../../Shared/Services/shared.service';
import * as AuthActions from '../actions';
import { AuthDTO } from '../models/auth.dto';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);
  private sharedService = inject(SharedService);

  private responseOK: boolean;
  private errorResponse: any;
  loginFailure$: any;
  loginSuccess$: any;
  login$: any;

  constructor() {
    this.responseOK = false;

    this.login$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthActions.login),
        exhaustMap(({ credentials }) =>
          this.authService.login(credentials).pipe(
            map((userToken) => {
              const credentialsTemp: AuthDTO = {
                email: credentials.email,
                password: credentials.password,
                user_id: userToken.user_id,
                access_token: userToken.access_token
              };

              return AuthActions.loginSuccess({ credentials: credentialsTemp });
            }),
            catchError((error) => {
              return of(AuthActions.loginFailure({ payload: error }));
            }),
            finalize(async () => {
              await this.sharedService.managementToast(
                'loginFeedback',
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

    this.loginSuccess$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(AuthActions.loginSuccess),
          map(() => {
            this.responseOK = true;
          })
        );
      },
      { dispatch: false }
    );

    this.loginFailure$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(AuthActions.loginFailure),
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
