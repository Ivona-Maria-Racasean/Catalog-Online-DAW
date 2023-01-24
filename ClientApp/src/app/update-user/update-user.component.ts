import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UpdateUserData } from "app/interfaces/user/UpdateUserDto.model";
import { StudentData } from "app/models/ui-models/studentData.model";
import { User } from "app/models/ui-models/user.model";
import Swal from "sweetalert2";

import { UpdateUserService } from "./update-user.service";

@Component({
  selector: "app-update-user",
  templateUrl: "./update-user.component.html",
  styleUrls: ["./update-user.component.css"],
})
export class UpdateUserComponent implements OnInit {

  user: User;
  editForm: FormGroup;
  userId: number;
  studentData: StudentData;

  constructor(
    private updateService: UpdateUserService,
    @Inject(Router) private _router: Router,
    @Inject(ActivatedRoute) private _activatedroute: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.userId = this._activatedroute.snapshot.queryParams.id;
    this.user = await this.updateService.getUserById(this.userId).toPromise();
    if(this.user.roleId == "1"){
      this.studentData = await this.updateService.GetStudentData(this.userId).toPromise();
    } else{
      const data: StudentData = {
        id: "",
        userId: this.user.id, 
        class: "",
        registrationNumber: "",
        yearOfStudying: "",
        subjects: undefined,
        user: undefined
      }
      this.studentData = data
    }
  }

  submitUpdate(){
    const updatedUserData: UpdateUserData = {...this.studentData, ...this.user}

    if(this.user.roleId != "1"){
      updatedUserData.yearOfStudying = "0";
    }

    this.updateService.UpdateUserData(this.userId, updatedUserData).subscribe(res => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "User was updated successfuly!"
      }).then(_ =>{
        this._router.navigate(['/users'])
      })
    })
  }
}
