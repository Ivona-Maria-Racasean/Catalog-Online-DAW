import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialog } from "@angular/material";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { UpdateUserData } from "app/interfaces/user/UpdateUserDto.model";
import { UserForRegistrationDto } from "app/interfaces/user/UserForRegistrationDto.model";
import { UserTeacherForRegistrationDto } from "app/interfaces/user/UserTeacherForRegistrationDto.model";
import { User } from "app/models/ui-models/user.model";
import { AuthenticationService } from "app/shared/services/authentication.service";
import { UpdateUserComponent } from "app/update-user/update-user.component";
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

  id: number;

  user: User[] = [];
  userForm: FormGroup = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl("", [Validators.required, Validators.email]),
    address: new FormControl(""),
    phoneNumber: new FormControl(""),
    password: new FormControl("", [Validators.required]),
  });
  userFromTeacher: FormGroup = new FormGroup({
    firstNameTeacher: new FormControl(""),
    lastNameTeacher: new FormControl(""),
    emailTeacher: new FormControl("", [Validators.required, Validators.email]),
    addressTeacher: new FormControl(""),
    phoneNumberTeacher: new FormControl(""),
    passwordTeacher: new FormControl("", [Validators.required]),
  });

  displayedColumns: string[] = [
    "firstName",
    "lastName",
    "rol",
    "email",
    "address",
    "phoneNumber",
    "actions",
  ];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  @ViewChild(MatPaginator, { static: true }) matPaginator!: MatPaginator;
  filterString = "";

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    @Inject(Router) private _router: Router,
    @Inject(ActivatedRoute) private _activatedroute: ActivatedRoute,
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
  }

  public validateControl(controlName: string) {
    return (
      this.userForm.controls[controlName].invalid &&
      this.userForm.controls[controlName].touched
    );
  }

  public hasError(controlName: string, errorName: string) {
    return this.userForm.controls[controlName].hasError(errorName);
  }

  public Register = (registerFormValue) => {
    this.showError = false;

    const formValues = { ...registerFormValue };
    const user: UserForRegistrationDto = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      address: formValues.address,
      phoneNumber: formValues.phoneNumber,
      password: formValues.password,
    };
    this.userService.Register(user).subscribe(
      (_) => {
        Swal.fire({
          icon: "success",
          title: "Your account has been created",
          showConfirmButton: true,
        }).then((result) => {
          this._router.navigate(["/"]);
        });
      },
      (error) => {
        if (error.error.errors) {
          this.showError = true;
          this.errorMessage = error.error.errors;
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: "Please try again later!",
          });
        }
      }
    );
  };

  /// Teacher

  public validateControlTeacher(controlName: string) {
    return (
      this.userFromTeacher.controls[controlName].invalid &&
      this.userFromTeacher.controls[controlName].touched
    );
  }

  public hasErrorTeacher(controlName: string, errorName: string) {
    return this.userFromTeacher.controls[controlName].hasError(errorName);
  }

  public RegisterTeacher = (registerFormValue) => {
    this.showError = false;

    const formValues = { ...registerFormValue };
    const teacher: UserTeacherForRegistrationDto = {
      firstNameTeacher: formValues.firstNameTeacher,
      lastNameTeacher: formValues.lastNameTeacher,
      emailTeacher: formValues.emailTeacher,
      addressTeacher: formValues.addressTeacher,
      phoneNumberTeacher: formValues.phoneNumberTeacher,
      passwordTeacher: formValues.passwordTeacher,
    };
    this.userService.RegisterTeacher(teacher).subscribe(
      (_) => {
        Swal.fire({
          icon: "success",
          title: "Your account has been created",
          showConfirmButton: true,
        }).then((result) => {
          this._router.navigate(["/"]);
        });
      },
      (error) => {
        if (error.error.errors) {
          this.showError = true;
          this.errorMessage = error.error.errors;
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: "Please try again later!",
          });
        }
      }
    );
  };
}
