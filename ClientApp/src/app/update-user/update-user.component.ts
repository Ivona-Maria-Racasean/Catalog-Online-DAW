import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'app/models/ui-models/user.model';
import { UpdateUserService } from './update-user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  id: string;
  user: User[] = [];
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private update_user: UpdateUserService,
    @Inject(Router) private _router: Router,
    @Inject(ActivatedRoute) private _activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this._activatedroute.snapshot.params['id'];
    console.log(this._activatedroute.snapshot.params['id'])
    this.update_user.getUserById(this.id).subscribe((res) => {
      this.editForm.patchValue({
        firstName: res[0].firstName,
        lastName: res[0].lastName,
        email: res[0].email,
        address: res[0].address,
        phoneNumber: res[0].phoneNumber,
      });
    });

    this.editForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      address:['', Validators.required],
      phoneNumber:['', Validators.required],
    });
  }

}
