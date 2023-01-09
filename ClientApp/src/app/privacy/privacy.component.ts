import { Component, OnInit } from '@angular/core';
import { User } from 'app/models/api-models/user.model';
import { RepositoryService } from 'app/shared/services/repository.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {

  public claims: [] = [];
  currentUser: User

  constructor(private _repository: RepositoryService) { }
  ngOnInit(): void {
    this.getClaims();
  }
  public getClaims = () =>{
    this._repository.getClaims('../privacy')
    .subscribe(res => {
      this.claims = res as [];
    })
  }

}


