declare var google :any;
import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {LoginService} from "./login.service";
import {CsrfService} from "./csrf.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit,AfterViewInit{
  isLoggedin?: boolean;

  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(2)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  registerForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  isLogin: boolean = true;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private loginService: LoginService,
    private csrfService: CsrfService,
  ) {
    console.log('Constructor - socialAuthService:');
    this.createForms();
  }

  ngAfterViewInit(): void {
    console.log(document.getElementById('google_btn'))
    setTimeout(()=>{
      google.accounts.id.initialize({
        client_id:'7217142055-a5v88qjgt7fl8ejabirqtvduk3o6pmhb.apps.googleusercontent.com',
        callback:(resp:any)=>{
          this.handleLogin(resp)
        },

      });
      google.accounts.id.renderButton(document.getElementById('google_btn'), {
        theme: 'filled_blue',
        size: 'large',
        shape: 'rectangle',
        width: 350,
        click_listener: this.onClickHandler
      });
    },1)

  }

  decodeToken(token:string){
    return JSON.parse(atob(token.split(".")[1]))
  }
  handleLogin(response:any){
    console.log(response)
    if(response){
      const payload = this.decodeToken(response.credential)
      localStorage.setItem('token', response.credential);
      payload['username'] = payload.name
      localStorage.setItem('userData', JSON.stringify(payload));
      this.router.navigate(['home']);
    }
  }
  ngOnInit() {
    // console.log('Constructor - socialAuthService:', this.socialAuthService);
    //
    // this.socialAuthService.authState.subscribe((user) => {
    //   this.socialUser = user;
    //   this.isLoggedin = user != null;
    //   console.log(this.socialUser);
    // });
//google authentication





  }

  onClickHandler(){
    console.log("Sign in with Google button clicked...")
  }
  createForms() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
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

  onRegister(): void {
    console.log('onRegister - registerForm:', this.registerForm.value);
    if (this.registerForm.valid) {
      console.log('is valid');
      this.loginService.registerUser(this.registerForm.value).subscribe({
        next: (response) => {
          this.toastr.success('Registration successful');
        },
        error: (error) => {
          this.toastr.error('Registration failed');
          console.error('Registration error:', error);
        }
      });
    }
  }
  showLoginForm() {
    this.isLogin = true;
    setTimeout(()=>{
      google.accounts.id.renderButton(document.getElementById('google_btn'), {
        theme: 'filled_blue',
        size: 'large',
        shape: 'rectangle',
        width: 350,
        click_listener: this.onClickHandler
      },1);
    })
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
