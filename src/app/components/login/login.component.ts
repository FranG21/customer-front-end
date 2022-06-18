import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  titulo = 'Login';
  loginForm: FormGroup;
  subRef$: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _loginService: LoginService,
    private autoroute: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.subRef$) {
      this.subRef$.unsubscribe();
    }
  }

  login() {
    const login: Login = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
      type: 1,
    };

    this.subRef$ = this._loginService.login(login).subscribe(
      (data) => {
        const token = data.data.token;
        sessionStorage.setItem('token', token);
        this.router.navigate(['/list-customer']);
      },
      (error) => {
        console.log(error);
        this.loginForm.reset();
      }
    );
  }
}
