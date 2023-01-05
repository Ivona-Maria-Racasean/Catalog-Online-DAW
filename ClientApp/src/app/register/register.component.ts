import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordConfirmationValidatorService } from '../shared/custom-validators/password-confirmation-validator-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private _passConfValidator: PasswordConfirmationValidatorService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
      passwordAgain: new FormControl("")
    });

    this.registerForm.get('passwordAgain').setValidators([Validators.required, this._passConfValidator.validateConfirmPassword(this.registerForm.get('password'))]);
  }

  public validateControl(controlName: string) {
    return (
      this.registerForm.controls[controlName].invalid &&
      this.registerForm.controls[controlName].touched
    );
  }

  public hasError(controlName: string, errorName: string) {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  public registerUser(registerFormValue) {
    console.log("Email: " + registerFormValue.email)
    console.log("Password: " + registerFormValue.password)
    console.log("Password Again: " + registerFormValue.passwordAgain ) 
  }

}
