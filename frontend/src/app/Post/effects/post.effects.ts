import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, finalize, map } from 'rxjs/operators';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import * as PostActions from '../actions';
import { PostService } from '../services/post.service';

@Injectable()
export class PostsEffects {
  private responseOK: boolean;
  private errorResponse: any;

  constructor(
    private actions$: Actions,
    private postService: PostService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.responseOK = false;
  }

  getPostsByUserId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostActions.getPostsByUserId),
      exhaustMap(({ userId }) =>
        this.postService.getPostsByUserId(userId).pipe(
          map((posts) => {
            return PostActions.getPostsByUserIdSuccess({
              posts: posts
            });
          }),
          catchError((error) => {
            return of(PostActions.getPostsByUserIdFailure({ payload: error }));
          })
        )
      )
    );
  });

  getPostsByUserIdFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(PostActions.getPostsByUserIdFailure),
        map((error) => {
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      );
    },
    { dispatch: false }
  );

  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostActions.deletePost),
      exhaustMap(({ postId }) =>
        this.postService.deletePost(postId).pipe(
          map(() => {
            return PostActions.deletePostSuccess({
              postId: postId
            });
          }),
          catchError((error) => {
            return of(PostActions.deletePostFailure({ payload: error }));
          })
        )
      )
    );
  });

  deletePostFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(PostActions.deletePostFailure),
        map((error) => {
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      );
    },
    { dispatch: false }
  );

  getPostById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostActions.getPostById),
      exhaustMap(({ postId }) =>
        this.postService.getPostById(postId).pipe(
          map((post) => {
            return PostActions.getPostByIdSuccess({
              post: post
            });
          }),
          catchError((error) => {
            return of(PostActions.getPostByIdFailure({ payload: error }));
          })
        )
      )
    );
  });

  getPostByIdFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(PostActions.getPostByIdFailure),
        map((error) => {
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      );
    },
    { dispatch: false }
  );

  createPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostActions.createPost),
      exhaustMap(({ post }) =>
        this.postService.createPost(post).pipe(
          map((post) => {
            return PostActions.createPostSuccess({
              post: post
            });
          }),
          catchError((error) => {
            return of(PostActions.createPostFailure({ payload: error }));
          }),
          finalize(async () => {
            await this.sharedService.managementToast(
              'postFeedback',
              this.responseOK,
              this.errorResponse
            );

            if (this.responseOK) {
              this.router.navigateByUrl('posts');
            }
          })
        )
      )
    );
  });

  createPostSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(PostActions.createPostSuccess),
        map(() => {
          this.responseOK = true;
        })
      );
    },
    { dispatch: false }
  );

  createPostFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(PostActions.createPostFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      );
    },
    { dispatch: false }
  );

  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostActions.updatePost),
      exhaustMap(({ postId, post }) =>
        this.postService.updatePost(postId, post).pipe(
          map((post) => {
            return PostActions.updatePostSuccess({
              postId: postId,
              post: post
            });
          }),
          catchError((error) => {
            return of(PostActions.updatePostFailure({ payload: error }));
          }),
          finalize(async () => {
            await this.sharedService.managementToast(
              'postFeedback',
              this.responseOK,
              this.errorResponse
            );

            if (this.responseOK) {
              this.router.navigateByUrl('posts');
            }
          })
        )
      )
    );
  });

  updatePostSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(PostActions.updatePostSuccess),
        map(() => {
          this.responseOK = true;
        })
      );
    },
    { dispatch: false }
  );

  updatePostFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(PostActions.updatePostFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      );
    },
    { dispatch: false }
  );

  getPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostActions.getPosts),
      exhaustMap(() =>
        this.postService.getPosts().pipe(
          map((posts) => {
            return PostActions.getPostsSuccess({
              posts: posts
            });
          }),
          catchError((error) => {
            return of(PostActions.getPostsFailure({ payload: error }));
          })
        )
      )
    );
  });

  getPostsFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(PostActions.getPostsFailure),
        map((error) => {
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      );
    },
    { dispatch: false }
  );

  likePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostActions.likePost),
      exhaustMap(({ postId }) =>
        this.postService.likePost(postId).pipe(
          map(() => {
            return PostActions.likePostSuccess({
              postId: postId
            });
          }),
          catchError((error) => {
            return of(PostActions.likePostFailure({ payload: error }));
          })
        )
      )
    );
  });

  likePostFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(PostActions.likePostFailure),
        map((error) => {
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      );
    },
    { dispatch: false }
  );

  dislikePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostActions.dislikePost),
      exhaustMap(({ postId }) =>
        this.postService.likePost(postId).pipe(
          map(() => {
            return PostActions.dislikePostSuccess({
              postId: postId
            });
          }),
          catchError((error) => {
            return of(PostActions.dislikePostFailure({ payload: error }));
          })
        )
      )
    );
  });

  dislikePostFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(PostActions.dislikePostFailure),
        map((error) => {
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      );
    },
    { dispatch: false }
  );
}
