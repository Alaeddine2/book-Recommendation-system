import {Component, ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class LoginComponent {
  socialUser!: SocialUser;
  isLoggedin?: boolean;
  
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

  constructor(private fb: FormBuilder, private toastr: ToastrService,private router: Router,
    private socialAuthService: SocialAuthService  ) {
      console.log('Constructor - socialAuthService:', this.socialAuthService);
    this.createForms();
  }

  ngOnInit() {
    console.log('Constructor - socialAuthService:', this.socialAuthService);

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(this.socialUser);
    });
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
      this.toastr.success('Login successful!', 'Toastr fun!');
      this.router.navigate(['home']);
      console.log('Login successful', this.loginForm.value);
    } else {
      this.toastr.error('Error!', 'Login form is not valid!');
      this.router.navigate(['home']);
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

  loginWithGoogle() {
    if (this.socialAuthService.authState) {
      // User is already authenticated, handle accordingly
      console.log('User is already authenticated:', this.socialAuthService);
    } else {
      // User is not authenticated, initiate the sign-in process
      this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
        .then(user => console.log('SignIn success:', user))
        .catch(error => console.error('SignIn error:', error));
    }
  }
}
