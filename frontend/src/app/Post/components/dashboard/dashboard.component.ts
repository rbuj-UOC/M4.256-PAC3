import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as PostsAction from '../../actions';
import { PostDTO } from '../../models/post.dto';
import { selectPosts } from '../../selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  posts: PostDTO[];
  numLikes: number;
  numDislikes: number;
  pieChartData = [
    { name: 'likes', value: 0 },
    { name: 'Dislikes', value: 0 }
  ];

  constructor(private store: Store) {
    this.posts = new Array<PostDTO>();
    this.numLikes = 0;
    this.numDislikes = 0;

    this.store.select(selectPosts).subscribe((posts) => {
      this.posts = posts;
      this.numLikes = 0;
      this.numDislikes = 0;
      this.posts.forEach((post) => {
        this.numLikes = this.numLikes + post.num_likes;
        this.numDislikes = this.numDislikes + post.num_dislikes;
      });
      this.pieChartData = [
        { name: 'Likes', value: this.numLikes },
        { name: 'Dislikes', value: this.numDislikes }
      ];
    });
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  private loadPosts(): void {
    this.store.dispatch(PostsAction.getPosts());
  }
}
