import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeleteUserService {

  private baseAPiUrl ='https://localhost:44350';

  constructor(private httpClient: HttpClient) { }

  DeleteUserData(id: number)  {
    return this.httpClient.delete(this.baseAPiUrl + '/api/user/delete' + id)
  }


}
