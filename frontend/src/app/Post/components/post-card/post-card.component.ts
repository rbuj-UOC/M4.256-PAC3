import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PostCardDTO } from '../../models/post-card.dto';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent {
  @Input() public postCardDTO!: PostCardDTO;
  @Input() public showButtons!: boolean;
  @Output() public postLike = new EventEmitter<string>();
  @Output() public postDislike = new EventEmitter<string>();

  postLikeClick() {
    this.postLike.emit(this.postCardDTO.postId);
  }
  postDislikeClick() {
    this.postDislike.emit(this.postCardDTO.postId);
  }
}
