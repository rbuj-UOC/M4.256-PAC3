import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCredentials } from 'src/app/Auth/selectors';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import * as PostsAction from '../../actions';
import { PostCardDTO } from '../../models/post-card.dto';
import { selectPosts } from '../../selectors';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0.2 })),
      transition('void <=> *', animate(1500))
    ])
  ]
})
export class HomeComponent {
  posts: PostCardDTO[];
  showButtons: boolean;

  constructor(
    private postService: PostService,
    private sharedService: SharedService,
    private store: Store
  ) {
    this.posts = new Array<PostCardDTO>();
    this.showButtons = false;

    this.store.select(selectCredentials).subscribe((credentials) => {
      this.showButtons = false;

      if (credentials.access_token) {
        this.showButtons = true;
      }
    });

    this.store.select(selectPosts).subscribe((posts) => {
      this.posts = <Array<PostCardDTO>>posts;
    });
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  private loadPosts(): void {
    this.store.dispatch(PostsAction.getPosts());
  }

  like(postId: string): void {
    let errorResponse: any;

    this.postService.likePost(postId).subscribe(
      () => {
        this.loadPosts();
      },
      (error: HttpErrorResponse) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    );
  }

  dislike(postId: string): void {
    let errorResponse: any;

    this.postService.dislikePost(postId).subscribe(
      () => {
        this.loadPosts();
      },
      (error: HttpErrorResponse) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    );
  }
}
