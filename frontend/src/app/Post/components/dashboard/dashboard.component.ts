import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import Chart, { ChartType } from 'chart.js/auto';
import * as PostsAction from '../../actions';
import { PostDTO } from '../../models/post.dto';
import { selectPosts } from '../../selectors';

@Component({
  selector: 'app-dashboard',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  posts: PostDTO[];
  numLikes: number;
  numDislikes: number;
  chart: Chart;

  chartData = [
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
      if (!this.chart) {
        this.chart = new Chart('chart', {
          type: 'bar' as ChartType,
          data: {
            labels: ['Likes', 'Dislikes'],
            datasets: [
              {
                label: 'Likes/Dislikes',
                data: [this.numLikes, this.numDislikes],
                backgroundColor: [
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 99, 132, 0.2)'
                ],
                borderWidth: 1
              }
            ]
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: 'Student Gender'
              }
            }
          }
        });
      } else {
        this.chart.data.datasets[0].data = [this.numLikes, this.numDislikes];
        this.chart.update();
      }
    });
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  private loadPosts(): void {
    this.store.dispatch(PostsAction.getPosts());
  }
}
