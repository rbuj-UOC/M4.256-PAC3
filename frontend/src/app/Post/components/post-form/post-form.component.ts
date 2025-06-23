import { formatDate } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserId } from '../../../Auth/selectors';
import * as CategoriesAction from '../../../Category/actions';
import { CategoryDTO } from '../../../Category/models/category.dto';
import { selectCategories } from '../../../Category/selectors';
import * as PostsAction from '../../actions';
import { PostDTO } from '../../models/post.dto';
import { selectPost } from '../../selectors';

@Component({
  selector: 'app-post-form',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  private store = inject(Store);

  post: PostDTO;
  title: FormControl;
  description: FormControl;
  num_likes!: FormControl;
  num_dislikes!: FormControl;
  publication_date: FormControl;
  categories!: FormControl;

  postForm: FormGroup;
  isValidForm: boolean | null;

  private isUpdateMode: boolean;
  private postId: string | null;

  categoriesList!: CategoryDTO[];

  private userId: string;

  constructor() {
    this.userId = '';

    this.isValidForm = null;
    this.postId = this.activatedRoute.snapshot.paramMap.get('id');
    this.post = new PostDTO('', '', 0, 0, new Date());
    this.isUpdateMode = false;

    this.title = new FormControl(this.post.title, [
      Validators.required,
      Validators.maxLength(55)
    ]);

    this.description = new FormControl(this.post.description, [
      Validators.required,
      Validators.maxLength(255)
    ]);

    this.publication_date = new FormControl(
      formatDate(this.post.publication_date, 'yyyy-MM-dd', 'en'),
      [Validators.required]
    );

    this.num_likes = new FormControl(this.post.num_likes);
    this.num_dislikes = new FormControl(this.post.num_dislikes);

    this.categories = new FormControl([]);

    this.postForm = this.formBuilder.group({
      title: this.title,
      description: this.description,
      publication_date: this.publication_date,
      categories: this.categories,
      num_likes: this.num_likes,
      num_dislikes: this.num_dislikes
    });

    this.store.select(selectUserId).subscribe((user_id) => {
      if (user_id) {
        this.userId = user_id;
      }
    });

    this.store.select(selectCategories).subscribe((categories) => {
      this.categoriesList = categories;
    });

    this.store.select(selectPost).subscribe((post) => {
      this.post = post;

      this.title.setValue(this.post.title);

      this.description.setValue(this.post.description);

      this.publication_date.setValue(
        formatDate(this.post.publication_date, 'yyyy-MM-dd', 'en')
      );

      if (this.post.categories) {
        const categoriesIds: string[] = [];
        this.post.categories.forEach((cat: CategoryDTO) => {
          categoriesIds.push(cat.categoryId);
        });

        this.categories.setValue(categoriesIds);
      }

      this.num_likes.setValue(this.post.num_likes);
      this.num_dislikes.setValue(this.post.num_dislikes);

      this.postForm = this.formBuilder.group({
        title: this.title,
        description: this.description,
        publication_date: this.publication_date,
        categories: this.categories,
        num_likes: this.num_likes,
        num_dislikes: this.num_dislikes
      });
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

  ngOnInit(): void {
    if (this.postId) {
      this.isUpdateMode = true;
      this.store.dispatch(PostsAction.getPostById({ postId: this.postId }));
    } else {
      this.postForm.reset();
      this.publication_date.setValue(
        formatDate(this.post.publication_date, 'yyyy-MM-dd', 'en')
      );
    }
  }

  private editPost(): void {
    if (this.postId) {
      if (this.userId) {
        this.post.userId = this.userId;

        this.store.dispatch(
          PostsAction.updatePost({
            postId: this.postId,
            post: this.post
          })
        );
      }
    }
  }

  private createPost(): void {
    if (this.userId) {
      this.post.userId = this.userId;
      this.post.num_likes = 0;
      this.post.num_dislikes = 0;
      this.store.dispatch(PostsAction.createPost({ post: this.post }));
    }
  }

  savePost(): void {
    this.isValidForm = false;

    if (this.postForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.post = this.postForm.value;

    if (this.isUpdateMode) {
      this.editPost();
    } else {
      this.createPost();
    }
  }
}
