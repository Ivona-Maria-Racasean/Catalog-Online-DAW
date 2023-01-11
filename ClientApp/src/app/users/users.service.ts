import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistrationResponseDto } from 'app/interfaces/response/RegistrationResponseDto.model';
import { User } from 'app/models/ui-models/user.model';
import { Observable } from 'rxjs/internal/Observable';
import { UserForRegistrationDto } from "../interfaces/user/UserForRegistrationDto.model";
@Injectable({
  providedIn: 'root'
})
export class UsersService {

   private baseAPiUrl ='https://localhost:44350';

  constructor(private httpClient: HttpClient) { }

  GetAllUserData(): Observable<User[]>{
    return this.httpClient.get<User[]>(this.baseAPiUrl + '/api/user/UserRol');
  }

  Register(body: UserForRegistrationDto){
    return this.httpClient.post<RegistrationResponseDto>(this.baseAPiUrl + '/api/user', body);
  }
}
