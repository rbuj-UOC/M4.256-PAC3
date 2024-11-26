import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserId } from 'src/app/Auth/selectors';
import * as CategoriesAction from '../../actions';
import { CategoryDTO } from '../../models/category.dto';
import { selectCategories } from '../../selectors';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent {
  categories: CategoryDTO[];
  displayedColumns: string[] = [
    'category-id',
    'category-title',
    'category-description',
    'category-css-color',
    'category-actions'
  ];

  private userId: string;
  constructor(
    private router: Router,
    private store: Store
  ) {
    this.userId = '';
    this.categories = new Array<CategoryDTO>();

    this.store.select(selectUserId).subscribe((user_id) => {
      if (user_id) {
        this.userId = user_id;
      }
    });

    this.store.select(selectCategories).subscribe((categories) => {
      this.categories = categories;
    });

    this.loadCategories();
  }

  private loadCategories(): void {
    if (this.userId) {
      this.store.dispatch(
        CategoriesAction.getCategoriesByUserId({ userId: this.userId })
      );
    }
  }

  createCategory(): void {
    this.router.navigateByUrl('/user/category/');
  }

  updateCategory(categoryId: string): void {
    this.router.navigateByUrl('/user/category/' + categoryId);
  }

  deleteCategory(categoryId: string): void {
    // show confirmation popup
    const result = confirm(
      'Confirm delete category with id: ' + categoryId + ' .'
    );
    if (result) {
      this.store.dispatch(
        CategoriesAction.deleteCategory({ categoryId: categoryId })
      );
    }
  }
}
