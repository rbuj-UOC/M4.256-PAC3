import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCredentials } from 'src/app/Auth/selectors';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import * as PostsAction from '../../actions';
import { PostDTO } from '../../models/post.dto';
import { selectPosts } from '../../selectors';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  posts: PostDTO[];
  showButtons: boolean;

  private userId: string;

  constructor(
    private postService: PostService,
    private sharedService: SharedService,
    private store: Store
  ) {
    this.userId = '';
    this.posts = new Array<PostDTO>();
    this.showButtons = false;

    this.store.select(selectCredentials).subscribe((credentials) => {
      this.showButtons = false;

      if (credentials.user_id) {
        this.userId = credentials.user_id;
      }
      if (credentials.access_token) {
        this.showButtons = true;
      }
    });

    this.store.select(selectPosts).subscribe((posts) => {
      this.posts = posts;
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
