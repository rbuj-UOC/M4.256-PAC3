import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, finalize, map } from 'rxjs/operators';
import { SharedService } from '../../Shared/Services/shared.service';
import * as PostActions from '../actions';
import { PostService } from '../services/post.service';

@Injectable()
export class PostsEffects {
  private actions$ = inject(Actions);
  private postService = inject(PostService);
  private sharedService = inject(SharedService);
  private router = inject(Router);

  private responseOK: boolean;
  private errorResponse: any;
  getPostsByUserId$: any;
  getPostsByUserIdFailure$: any;
  deletePost$: any;
  deletePostFailure$: any;
  getPostById$: any;
  getPostByIdFailure$: any;
  createPost$: any;
  createPostSuccess$: any;
  createPostFailure$: any;
  updatePost$: any;
  updatePostSuccess$: any;
  updatePostFailure$: any;
  getPosts$: any;
  getPostsFailure$: any;
  likePost$: any;
  likePostFailure$: any;
  dislikePost$: any;
  dislikePostFailure$: any;

  constructor() {
    this.responseOK = false;

    this.getPostsByUserId$ = createEffect(() => {
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
              return of(
                PostActions.getPostsByUserIdFailure({ payload: error })
              );
            })
          )
        )
      );
    });

    this.getPostsByUserIdFailure$ = createEffect(
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

    this.deletePost$ = createEffect(() => {
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

    this.deletePostFailure$ = createEffect(
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

    this.getPostById$ = createEffect(() => {
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

    this.getPostByIdFailure$ = createEffect(
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

    this.createPost$ = createEffect(() => {
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

    this.createPostSuccess$ = createEffect(
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

    this.createPostFailure$ = createEffect(
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

    this.updatePost$ = createEffect(() => {
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

    this.updatePostSuccess$ = createEffect(
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

    this.updatePostFailure$ = createEffect(
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

    this.getPosts$ = createEffect(() => {
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

    this.getPostsFailure$ = createEffect(
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

    this.likePost$ = createEffect(() => {
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

    this.likePostFailure$ = createEffect(
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

    this.dislikePost$ = createEffect(() => {
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

    this.dislikePostFailure$ = createEffect(
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
}
