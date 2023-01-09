import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginInfoDto } from 'app/interfaces/user/loginInfoDto.model';
import { LoginResponseDto } from 'app/interfaces/response/loginResponseDto.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private returnUrl: string;

  loginForm: FormGroup;
  errorMessage: string = '';
  showError: boolean;

  constructor(private authService: AuthenticationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  validateControl = (controlName: string) => {
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched
  }

  hasError = (controlName: string, errorName: string) => {
    return this.loginForm.get(controlName).hasError(errorName)
  }

  loginUser = (loginFormValue) => {
    this.showError = false;
    const login = {... loginFormValue };

    const userForAuth: LoginInfoDto = {
      email: login.username,
      password: login.password
    }

    this.authService.loginUser('api/login', userForAuth)
    .subscribe({
      next: (res:LoginResponseDto) => {
        localStorage.setItem("token", res.jwToken);
        console.log(res);
        this.authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
        this.router.navigate([this.returnUrl]);
    },
    error: (err: HttpErrorResponse) => {
      this.errorMessage = err.message;
      this.showError = true;
    }})
  }
}
