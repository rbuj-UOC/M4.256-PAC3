import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAccessToken } from '../../Auth/selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private access_token = '';
  constructor(
    private router: Router,
    private store: Store
  ) {
    this.store.select(selectAccessToken).subscribe((access_token) => {
      this.access_token = '';
      if (access_token) {
        this.access_token = access_token;
      }
    });
  }

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.access_token) {
      return true;
    }

    this.router.navigate(['/login']);

    return false;
  }
}
