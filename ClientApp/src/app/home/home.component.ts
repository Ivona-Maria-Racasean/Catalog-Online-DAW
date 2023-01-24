import { Component, Input, OnInit } from '@angular/core';
import { CurrentUser } from 'app/models/ui-models/currentUser.model';
import { NavMenuComponent } from 'app/nav-menu/nav-menu.component';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {


  currentUser!: CurrentUser;
  constructor(private AuthService: AuthenticationService) { }
  async ngOnInit() {
    this.currentUser = await this.AuthService.getCurrentUser().toPromise();
    }


}
