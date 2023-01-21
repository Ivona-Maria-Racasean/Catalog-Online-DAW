import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { UserForRegistrationDto } from "app/interfaces/user/UserForRegistrationDto.model";
import { User } from "app/models/ui-models/user.model";
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

  displayedUsers: User[] = [];
  selectedRole: string;
  
  id: number;

  users: User[] = [];
  userForm: FormGroup = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl("", [Validators.required, Validators.email]),
    role : new FormControl("0", [Validators.required]),
    address: new FormControl(""),
    phoneNumber: new FormControl(""),
    password: new FormControl("", [Validators.required]),
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
        this.selectedRole = "Select role to display"
        this.users = successResponse;
        this.displayedUsers = this.users;
        this.dataSource = new MatTableDataSource<User>(this.displayedUsers);

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

  public roleChange = () => {
    if(this.selectedRole === "Select role to display"){
      this.displayedUsers = this.users;
      this.dataSource = new MatTableDataSource<User>(this.displayedUsers);
    }
    else{
      this.displayedUsers = this.users.filter(user => {
        console.log(this.selectedRole)
        console.log(user) 
        return this.selectedRole == user.role
      });
      this.dataSource = new MatTableDataSource<User>(this.displayedUsers);
    }
  }

  public Register = (registerFormValue) => {
    this.showError = false;

    const formValues = { ...registerFormValue };
    const user: UserForRegistrationDto = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      roleId: formValues.role,
      address: formValues.address,
      phoneNumber: formValues.phoneNumber,
      password: formValues.password,
    };
    console.log(user)
  
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
}
