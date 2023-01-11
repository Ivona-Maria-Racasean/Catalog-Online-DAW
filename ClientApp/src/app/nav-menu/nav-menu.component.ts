import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './../shared/services/authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CurrentUser } from 'app/models/ui-models/currentUser.model';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  public isUserAuthenticated: boolean;
  public tokeUser = localStorage.getItem("token")
  isExpanded = false;
  currentUser: CurrentUser;
  constructor(private authService: AuthenticationService,private router: Router, private jwtHelper: JwtHelperService) { }



  ngOnInit(): void {
    // functie local storage verifica daca este tocken si daca este valid dupa punem isUserAuthenticated == true
    if(this.tokeUser!= null && !this.jwtHelper.isTokenExpired(this.tokeUser)){
      this.isUserAuthenticated = true;
      this.authService.getCurrentUser().subscribe( currentUser => {
        this.currentUser = currentUser
      }, err => console.error(err))
    }
    this.authService.authChanged
    .subscribe(res => {
      this.isUserAuthenticated = res;

      if(res == true){
        // call endpoint grt current user and save current utis
        this.authService.getCurrentUser().subscribe( currentUser => {
          this.currentUser = currentUser
        }, err => console.error(err))
      }})
    }
    collapse() {
    this.isExpanded = false;
    }

    toggle() {
    this.isExpanded = !this.isExpanded;
  } 

  public logout = () => {
    this.authService.logout();
    this.router.navigate(["/"]);
  }
}
