import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponseDto } from 'app/interfaces/response/loginResponseDto.model';
import { LoginInfoDto } from 'app/interfaces/user/loginInfoDto.model';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RoleType } from 'app/models/api-models/role-type';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private authChangeSub = new Subject<boolean>()
  public authChanged = this.authChangeSub.asObservable();

  constructor(private http: HttpClient,private jwtHelper: JwtHelperService) { }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  }

  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");

    return token && !this.jwtHelper.isTokenExpired(token);
    console.log(token);
  }

  public isUserAdmin = (): boolean => {
    const token = localStorage.getItem("token");
    const decodedToken = this.jwtHelper.decodeToken(token);
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    return role === RoleType.admin;
  }

  public isUserSecretery = (): boolean => {
    const token = localStorage.getItem("token");
    const decodedToken = this.jwtHelper.decodeToken(token);
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    return role === RoleType.secretary;
  }

  public loginUser = (route: string, body: LoginInfoDto) => {
    return this.http.post<LoginResponseDto>('https://localhost:44350/' + route, body);
  }

  public logout = () => {
    localStorage.removeItem("token");
    this.sendAuthStateChangeNotification(false);
  }

}
