import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './../shared/services/authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  public isUserAuthenticated: boolean;
  public tokeUser = localStorage.getItem("token")
  isExpanded = false;

  constructor(private authService: AuthenticationService,private router: Router, private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    // functie local storage verifica daca este tocken si daca este valid dupa punem isUserAuthenticated == true
    if(this.tokeUser!= null && !this.jwtHelper.isTokenExpired(this.tokeUser)){
      this.isUserAuthenticated = true;
    }
    this.authService.authChanged
    .subscribe(res => {
      this.isUserAuthenticated = res;
    })
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
