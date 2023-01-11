import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { UserForRegistrationDto } from "app/interfaces/user/UserForRegistrationDto.model";
import { User } from "app/models/ui-models/user.model";
import { AuthenticationService } from "app/shared/services/authentication.service";
import Swal from "sweetalert2";
import { UsersService } from "./users.service";


@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  public errorMessage: string = "";
  public showError: boolean;

  user: User[] = [];
  userForm: FormGroup;
  displayedColumns: string[] = [
    "firstName",
    "lastName",
    "rol",
    "email",
    "address",
    "phoneNumber",
  ];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  @ViewChild(MatPaginator, { static: true }) matPaginator!: MatPaginator;
  filterString = "";

  constructor(
    private _authService: AuthenticationService,
    private userService: UsersService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.userService.GetAllUserData().subscribe(
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

    this.userForm = new FormGroup({
      firstName: new FormControl( ""),
      lastName: new FormControl( ""),
      email: new FormControl ("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
      address: new FormControl(""),
      phoneNumber: new FormControl(""),
    });

  }

  public validateControl(controlName: string) {
    return this.userForm.controls[controlName].invalid && this.userForm.controls[controlName].touched
  }

  public hasError(controlName: string, errorName: string) {
    return this.userForm.controls[controlName].hasError(errorName)
  }

  public Register = (registerFormValue) => {

    this.showError = false

    const formValues = { ...registerFormValue };
    const user: UserForRegistrationDto = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password,
      address: formValues.address,
      phoneNumber: formValues.phoneNumber
    };
    this.userService.Register(user)
      .subscribe(_ => {
        Swal.fire({
          icon: 'success',
          title: 'Your account has been created',
          showConfirmButton: true,
        }).then((result) => {
          this._router.navigate(['/'])
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
