import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthAction from '../actions';
import { AuthDTO } from '../models/auth.dto';

@Component({
  selector: 'app-login',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private store = inject(Store);

  email: FormControl;
  password: FormControl;
  loginForm: FormGroup;

  constructor() {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
    ]);

    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16)
    ]);

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
  }

  login(): void {
    const credentials: AuthDTO = {
      email: this.email.value,
      password: this.password.value,
      user_id: '',
      access_token: ''
    };

    this.store.dispatch(AuthAction.login({ credentials }));
  }
}
