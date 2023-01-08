import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponseDto } from 'app/interfaces/response/loginResponseDto.model';
import { LoginInfoDto } from 'app/interfaces/user/loginInfoDto.model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private authChangeSub = new Subject<boolean>()
  public authChanged = this.authChangeSub.asObservable();

  constructor(private http: HttpClient) { }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  }

  public loginUser = (route: string, body: LoginInfoDto) => {
    return this.http.post<LoginResponseDto>('https://localhost:44530/' + route, body);
  }

}
