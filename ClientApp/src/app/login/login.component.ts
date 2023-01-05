import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
    });
  }

  public validateControl(controlName: string) {
    return (
      this.loginForm.controls[controlName].invalid &&
      this.loginForm.controls[controlName].touched
    );
  }

  public hasError(controlName: string, errorName: string) {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  public loginUser(loginFormValue) {
    console.log("Email: " + loginFormValue.email)
    console.log("Password: " + loginFormValue.password)
  }

}
