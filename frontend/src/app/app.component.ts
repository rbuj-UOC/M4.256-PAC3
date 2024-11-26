import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { selectAuthStateLoading } from './Auth/selectors';
import { selectCategoriesStateLoading } from './Category/selectors';
import { selectPostsStateLoading } from './Post/selectors';
import { selectUserStateLoading } from './User/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showLoadingAuth: Observable<boolean>;
  showLoadingCategories: Observable<boolean>;
  showLoadingPosts: Observable<boolean>;
  showLoadingUser: Observable<boolean>;

  constructor(private store: Store) {
    this.showLoadingAuth = this.store.select(selectAuthStateLoading);
    this.showLoadingCategories = this.store.select(
      selectCategoriesStateLoading
    );
    this.showLoadingPosts = this.store.select(selectPostsStateLoading);
    this.showLoadingUser = this.store.select(selectUserStateLoading);
  }
}
