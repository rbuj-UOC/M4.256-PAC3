import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/components/login.component';
import { CategoriesListComponent } from './Category/components/categories-list/categories-list.component';
import { CategoryFormComponent } from './Category/components/category-form/category-form.component';
import { DashboardComponent } from './Post/components/dashboard/dashboard.component';
import { HomeComponent } from './Post/components/home/home.component';
import { PostFormComponent } from './Post/components/post-form/post-form.component';
import { PostsListComponent } from './Post/components/posts-list/posts-list.component';
import { AuthGuard } from './Shared/Guards/auth.guard';
import { ProfileComponent } from './User/components/profile/profile.component';
import { RegisterComponent } from './User/components/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'posts',
    component: PostsListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/post/:id',
    component: PostFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'categories',
    component: CategoriesListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/category/:id',
    component: CategoryFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
