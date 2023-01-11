import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/models/ui-models/user.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

   private baseAPiUrl ='https://localhost:44350';

  constructor(private httpClient: HttpClient) { }

  GetTeachers(): Observable<User[]>{
    return this.httpClient.get<User[]>(this.baseAPiUrl + '/api/user/teachers')
  }

  GetAllUserData(): Observable<User[]>{
    return this.httpClient.get<User[]>(this.baseAPiUrl + '/api/user/UserRol');
  }

  Register(): Observable<User[]>{
    return this.httpClient.get<User[]>(this.baseAPiUrl + '/api/user');
  }
}
