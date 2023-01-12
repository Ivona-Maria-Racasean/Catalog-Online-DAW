import { Component, Input } from '@angular/core';
import { CurrentUser } from 'app/models/ui-models/currentUser.model';
import { NavMenuComponent } from 'app/nav-menu/nav-menu.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {


  @Input() currentUser!: CurrentUser;
  constructor(){}
}
