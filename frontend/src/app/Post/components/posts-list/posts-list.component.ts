import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserId } from '../../../Auth/selectors';
import * as PostsAction from '../../actions';
import { PostDTO } from '../../models/post.dto';
import { selectPosts } from '../../selectors';

@Component({
  selector: 'app-posts-list',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent {
  private router = inject(Router);
  private store = inject(Store);

  posts: PostDTO[];
  displayedColumns: string[] = [
    'post-id',
    'post-title',
    'post-description',
    'post-num-likes',
    'post-num-dislikes',
    'post-actions'
  ];
  private userId: string;

  constructor() {
    this.userId = '';
    this.posts = new Array<PostDTO>();

    this.store.select(selectUserId).subscribe((user_id) => {
      if (user_id) {
        this.userId = user_id;
      }
    });

    this.store.select(selectPosts).subscribe((posts) => {
      this.posts = posts;
    });

    this.loadPosts();
  }

  private loadPosts(): void {
    if (this.userId) {
      this.store.dispatch(
        PostsAction.getPostsByUserId({ userId: this.userId })
      );
    }
  }

  createPost(): void {
    this.router.navigateByUrl('/user/post/');
  }

  updatePost(postId: string): void {
    this.router.navigateByUrl('/user/post/' + postId);
  }

  deletePost(postId: string): void {
    // show confirmation popup
    const result = confirm('Confirm delete post with id: ' + postId + ' .');
    if (result) {
      this.store.dispatch(PostsAction.deletePost({ postId: postId }));
    }
  }
}
