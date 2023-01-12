import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UpdateUserData } from 'app/interfaces/user/UpdateUserDto.model';
import { User } from 'app/models/ui-models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserService {

  private baseAPiUrl ='https://localhost:44350';

  constructor(private httpClient: HttpClient) { }

  UpdateUserData(id, UpdateUserData): Observable<UpdateUserData> {
    return this.httpClient.patch<UpdateUserData>(this.baseAPiUrl + '/api/user/update' + id, UpdateUserData)
  }

  getUserById(id): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseAPiUrl + '/api/user/' + id)
  }

  DeleteUserData(id: number)  {
    return this.httpClient.delete(this.baseAPiUrl + '/api/user/' + id)
  }
}
