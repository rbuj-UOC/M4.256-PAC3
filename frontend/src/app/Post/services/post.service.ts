import { HttpClient } from '@angular/common/http';
import { NONE_TYPE } from '@angular/compiler';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { SharedService } from '../../Shared/Services/shared.service';
import { PostDTO } from '../models/post.dto';

interface updateResponse {
  affected: number;
}

interface deleteResponse {
  affected: number;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private http = inject(HttpClient);
  private sharedService = inject(SharedService);

  private urlBlogUocApi: string;
  private controller: string;

  constructor() {
    this.controller = 'posts';
    this.urlBlogUocApi = environment.apiUrl + '/' + this.controller;
  }

  getPosts(): Observable<PostDTO[]> {
    return this.http
      .get<PostDTO[]>(this.urlBlogUocApi)
      .pipe(catchError(this.sharedService.handleError));
  }

  getPostsByUserId(userId: string): Observable<PostDTO[]> {
    return this.http
      .get<PostDTO[]>(environment.apiUrl + '/users/posts/' + userId)
      .pipe(catchError(this.sharedService.handleError));
  }

  createPost(post: PostDTO): Observable<PostDTO> {
    return this.http
      .post<PostDTO>(this.urlBlogUocApi, post)
      .pipe(catchError(this.sharedService.handleError));
  }

  getPostById(postId: string): Observable<PostDTO> {
    return this.http
      .get<PostDTO>(this.urlBlogUocApi + '/' + postId)
      .pipe(catchError(this.sharedService.handleError));
  }

  updatePost(postId: string, post: PostDTO): Observable<PostDTO> {
    return this.http
      .put<PostDTO>(this.urlBlogUocApi + '/' + postId, post)
      .pipe(catchError(this.sharedService.handleError));
  }

  likePost(postId: string): Observable<updateResponse> {
    return this.http
      .put<updateResponse>(this.urlBlogUocApi + '/like/' + postId, NONE_TYPE)
      .pipe(catchError(this.sharedService.handleError));
  }

  dislikePost(postId: string): Observable<updateResponse> {
    return this.http
      .put<updateResponse>(this.urlBlogUocApi + '/dislike/' + postId, NONE_TYPE)
      .pipe(catchError(this.sharedService.handleError));
  }

  deletePost(postId: string): Observable<deleteResponse> {
    return this.http
      .delete<deleteResponse>(this.urlBlogUocApi + '/' + postId)
      .pipe(catchError(this.sharedService.handleError));
  }
}
