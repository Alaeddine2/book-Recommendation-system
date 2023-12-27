import {Component, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import {ToastrService} from 'ngx-toastr';
import {LoginService} from "./login.service";
import {CsrfService} from "./csrf.service";

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
    username: ['', [Validators.required, Validators.minLength(2)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  registerForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(2)]],
    image: ['', [Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  isLogin: boolean = true;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private socialAuthService: SocialAuthService,
    private loginService: LoginService,
    private csrfService: CsrfService
  ) {
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
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      image: ['', [Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }


  onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.loginService.login(username, password).subscribe(
        (response) => {
          const body = response.body;
          if (body) {
            console.log('Login successful', body);
            this.toastr.success('Login successful!', 'Toastr fun!', {
              positionClass: 'toast-top-right',
              timeOut: 3000, // 3 seconds
              closeButton: true,
              progressBar: true,
              progressAnimation: 'increasing'
            });

            if (body.token) {
              localStorage.setItem('token', body.token);
            }
            if (body.data) {
              localStorage.setItem('userData', JSON.stringify(body.data));
            }

            this.router.navigate(['home']);
          } else {
            console.error('Login response body is undefined');
          }
        },
        (error) => {
          console.error('Login error:', error);
          this.toastr.error('Error!', 'Login failed!', {
            positionClass: 'toast-top-right',
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
            progressAnimation: 'increasing',
            toastClass: 'ngx-toastr toast-error'
          });
        }
      );
    } else {
      this.toastr.error('Error!', 'Login form is not valid!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        closeButton: true,
        progressBar: true,
        progressAnimation: 'increasing',
        toastClass: 'ngx-toastr'
      });
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
    // if (this.socialAuthService.authState) {
    //   // User is already authenticated, handle accordingly
    //   console.log('User is already authenticated:', this.socialAuthService);
    // } else {
    //   // User is not authenticated, initiate the sign-in process
    //   this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
    //     .then(user => console.log('SignIn success:', user))
    //     .catch(error => console.error('SignIn error:', error));
    // }
  }
}
