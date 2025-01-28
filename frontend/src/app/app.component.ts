import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthAction from './Auth/actions';
import { selectAccessToken, selectAuthStateLoading } from './Auth/selectors';
import { selectCategoriesStateLoading } from './Category/selectors';
import { selectPostsStateLoading } from './Post/selectors';
import { selectUserStateLoading } from './User/selectors';

@Component({
  selector: 'app-root',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  showAuthSection: boolean;
  showNoAuthSection: boolean;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = true;
  isCollapsed = true;
  showLoadingAuth$: any;
  showLoadingCategories$: any;
  showLoadingPosts$: any;
  showLoadingUser$: any;

  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private store: Store
  ) {
    this.showAuthSection = false;
    this.showNoAuthSection = true;
    this.showLoadingAuth$ = this.store.select(selectAuthStateLoading);
    this.showLoadingCategories$ = this.store.select(
      selectCategoriesStateLoading
    );
    this.showLoadingPosts$ = this.store.select(selectPostsStateLoading);
    this.showLoadingUser$ = this.store.select(selectUserStateLoading);
  }
  ngOnInit(): void {
    this.observer.observe(['(max-width: 740px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
    this.store.select(selectAccessToken).subscribe((access_token) => {
      this.showAuthSection = false;
      this.showNoAuthSection = true;
      if (access_token) {
        this.showAuthSection = true;
        this.showNoAuthSection = false;
      }
    });
  }

  dashboard(): void {
    this.router.navigateByUrl('dashboard');
  }

  home(): void {
    this.router.navigateByUrl('home');
  }

  login(): void {
    this.router.navigateByUrl('login');
  }

  register(): void {
    this.router.navigateByUrl('register');
  }

  adminPosts(): void {
    this.router.navigateByUrl('posts');
  }

  adminCategories(): void {
    this.router.navigateByUrl('categories');
  }

  profile(): void {
    this.router.navigateByUrl('profile');
  }

  logout(): void {
    this.store.dispatch(AuthAction.logout());
    this.router.navigateByUrl('home');
  }

  toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false;
    } else {
      this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }
  }
}
