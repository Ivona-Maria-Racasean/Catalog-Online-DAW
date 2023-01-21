import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UpdateUser } from "app/models/ui-models/updateUser.model";

import { UpdateUserService } from "./update-user.service";


export class UserClass {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;

}


@Component({
  selector: "app-update-user",
  templateUrl: "./update-user.component.html",
  styleUrls: ["./update-user.component.css"],
})
export class UpdateUserComponent implements OnInit {

  user:UserClass;
  editForm: FormGroup;
  userId: number;

  constructor(
    private fb: FormBuilder,
    private update_user: UpdateUserService,
    //public dialog: MatDialog,
    @Inject(Router) private _router: Router,
    @Inject(ActivatedRoute) private _activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = this._activatedroute.snapshot.queryParams.id;
    console.log(this.userId);
    this.update_user.getUserById(this.userId).subscribe((res) => {
      console.log(Object.values(res));
      var dataUser = Object.values(res);
      // console.log(dataUser.length)
      this.editForm.patchValue({
        firstName: dataUser[2],
        lastName: dataUser[3],
        email: dataUser[4],
        address: dataUser[5],
        phoneNumber: dataUser[6],
      });
      console.log("form", this.editForm)
    });


    this.editForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required, Validators.email],
      address: ["", Validators.required],
      phoneNumber: ["", Validators.required],
    });

    this.update_user.DeleteUserData(this.userId).subscribe((data) =>{
      console.log(data);

    });
  }

  onSubmit() {
    this.update_user.UpdateUserData(this.userId, this.user).subscribe((res) => {
      this.user = new UserClass();
      this.gotoList();
    });
  }

  gotoList() {
    this._router.navigate(['/api/users']);
  }
}
