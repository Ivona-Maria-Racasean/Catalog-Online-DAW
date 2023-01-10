import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserForRegistrationDto } from 'app/interfaces/user/UserForRegistrationDto.model';
import { User } from 'app/models/ui-models/user.model';
import { AuthenticationService } from 'app/shared/services/authentication.service';
import { UsersService } from './users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public errorMessage: string = ''
  public showError: boolean

  user: User[] = [];
  displayedColumns: string[] = ['firstName', 'lastName','rol', 'email', 'address', 'phoneNumber'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  @ViewChild(MatPaginator, {static: true}) matPaginator!: MatPaginator;
  filterString = '';

  registerForm: FormGroup;


  constructor( private _authService: AuthenticationService,private userService: UsersService, private router: Router) { }

  ngOnInit(): void {

    this.userService.GetAllUserData()
      .subscribe(
        (successResponse) => {
          this.user = successResponse;
          //console.log(this.students)
          this.dataSource = new MatTableDataSource<User>(this.user);

          if (this.matPaginator) {
            this.dataSource.paginator = this.matPaginator;
          }
        },
        (errorResponse) => {
          console.log(errorResponse);
        }
      );

      this.userService.Register()
      .subscribe(
        (successResponse) => {
          console.log("merge")
        },(errorResponse) => {
          console.log(errorResponse);
        }
      );


      
      this.registerForm = new FormGroup({

        firstName: new FormControl("", [Validators.required]),
        lastName: new FormControl("", [Validators.required]),
        rol: new FormControl("", [Validators.required]),
        email: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", [Validators.required]),
        address: new FormControl("", [Validators.required]),
        phoneNumber: new FormControl("", [Validators.required]),

      });
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

  // public registerUser(registerFormValue) {
  //   console.log("Email: " + registerFormValue.email)
  //   console.log("Password: " + registerFormValue.password)
  //   next: (_) => this.router.navigate(["../authentication/login"])
  // }

  public registerUser = (registerFormValue) => {

    this.showError = false

    const formValues = { ...registerFormValue };
    const user: UserForRegistrationDto = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password,
      address: formValues.address,
      phoneNumber: formValues.phoneNumber,
    };
    this._authService.registerUser(user)
      .subscribe(_ => {
        Swal.fire({
          icon: 'success',
          title: 'Your account has been created',
          showConfirmButton: true,
        }).then((result) => {
          this.router.navigate(['/'])
        })
      },
        error => {
          if (error.error.errors) {
            this.showError = true
            this.errorMessage = error.error.errors
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: 'Please try again later!'
            })
          }

        }
      )
  }



}
