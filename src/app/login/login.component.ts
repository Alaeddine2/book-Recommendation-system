import {Component, ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class LoginComponent {
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  registerForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    address: ['', [Validators.required]],
    city: ['', [Validators.required]]
  });
  isLogin: boolean = true;

  constructor(private fb: FormBuilder) {
    this.createForms();
  }

  createForms() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log('Login successful', this.loginForm.value);
    } else {
      console.log('Login form is not valid');
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      console.log('Registration successful', this.registerForm.value);
    } else {
      console.log('Register form is not valid');
    }
  }

  showLoginForm() {
    this.isLogin = true;
  }

  showRegisterForm() {
    this.isLogin = false;
  }
}
