import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SecretaryGuard implements CanActivate {
  jwtHelper: any;

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.authService.isUserSecretery)
      return true;

    this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
    return false;
  }

}
