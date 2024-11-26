import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserId } from 'src/app/Auth/selectors';
import * as CategoriesAction from '../../actions';
import { CategoryDTO } from '../../models/category.dto';
import { selectCategory } from '../../selectors';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  category: CategoryDTO;
  title: FormControl;
  description: FormControl;
  css_color: FormControl;

  categoryForm: FormGroup;
  isValidForm: boolean | null;

  private isUpdateMode: boolean;
  private categoryId: string | null;

  private userId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store
  ) {
    this.userId = '';

    this.isValidForm = null;
    this.categoryId = this.activatedRoute.snapshot.paramMap.get('id');
    this.category = new CategoryDTO('', '', '');
    this.isUpdateMode = false;

    this.title = new FormControl(this.category.title, [
      Validators.required,
      Validators.maxLength(55)
    ]);

    this.description = new FormControl(this.category.description, [
      Validators.required,
      Validators.maxLength(255)
    ]);

    this.css_color = new FormControl(this.category.css_color, [
      Validators.required,
      Validators.maxLength(7)
    ]);

    this.categoryForm = this.formBuilder.group({
      title: this.title,
      description: this.description,
      css_color: this.css_color
    });

    this.store.select(selectUserId).subscribe((user_id) => {
      if (user_id) {
        this.userId = user_id;
      }
    });

    this.store.select(selectCategory).subscribe((category) => {
      this.category = category;

      this.title.setValue(this.category.title);

      this.description.setValue(this.category.description);

      this.css_color.setValue(this.category.css_color);

      this.categoryForm = this.formBuilder.group({
        title: this.title,
        description: this.description,
        css_color: this.css_color
      });
    });
  }

  ngOnInit(): void {
    // update
    if (this.categoryId) {
      this.isUpdateMode = true;
      this.store.dispatch(
        CategoriesAction.getCategoryById({ categoryId: this.categoryId })
      );
    } else {
      this.categoryForm.reset();
    }
  }

  private editCategory(): void {
    if (this.categoryId) {
      if (this.userId) {
        this.category.userId = this.userId;

        this.store.dispatch(
          CategoriesAction.updateCategory({
            categoryId: this.categoryId,
            category: this.category
          })
        );
      }
    }
  }

  private createCategory(): void {
    if (this.userId) {
      this.category.userId = this.userId;

      this.store.dispatch(
        CategoriesAction.createCategory({ category: this.category })
      );
    }
  }

  saveCategory(): void {
    this.isValidForm = false;

    if (this.categoryForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.category = this.categoryForm.value;

    if (this.isUpdateMode) {
      this.editCategory();
    } else {
      this.createCategory();
    }
  }
}
