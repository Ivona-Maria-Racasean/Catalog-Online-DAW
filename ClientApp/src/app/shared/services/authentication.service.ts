import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponseDto } from 'app/interfaces/response/loginResponseDto.model';
import { LoginInfoDto } from 'app/interfaces/user/loginInfoDto.model';
import { Observable, Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RoleType } from 'app/models/api-models/role-type';
import { CurrentUser } from 'app/models/ui-models/currentUser.model';
import { UserForRegistrationDto } from 'app/interfaces/user/UserForRegistrationDto.model';
import { RegistrationResponseDto } from 'app/interfaces/response/RegistrationResponseDto.model';
import { ApiCallPaths } from '../paths/apiCallPaths';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private authChangeSub = new Subject<boolean>()
  public authChanged = this.authChangeSub.asObservable();

  constructor(private http: HttpClient,private jwtHelper: JwtHelperService) { }

  public registerUser(body: UserForRegistrationDto) {
    return this.http.post<RegistrationResponseDto>('https://localhost:44350' + ApiCallPaths.registerPath, body);
  }

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

  public isUserTeacher = (): boolean => {
    const token = localStorage.getItem("token");
    const decodedToken = this.jwtHelper.decodeToken(token);
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    return role === RoleType.teacher;
  }

  public isUserStudent = (): boolean => {
    const token = localStorage.getItem("token");
    const decodedToken = this.jwtHelper.decodeToken(token);
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    return role === RoleType.student;
  }

  getCurrentUser():Observable<CurrentUser>{
    return this.http.get<CurrentUser>('https://localhost:44350' + '/api/user/GetCurrentUser');
  }

  public loginUser = (route: string, body: LoginInfoDto) => {
    return this.http.post<LoginResponseDto>('https://localhost:44350/' + route, body);
  }


  public logout = () => {
    localStorage.removeItem("token");
    this.sendAuthStateChangeNotification(false);
  }

}
