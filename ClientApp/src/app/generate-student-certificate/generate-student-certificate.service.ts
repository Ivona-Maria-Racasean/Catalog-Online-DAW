import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/ui-models/user.model';

@Injectable({
  providedIn: 'root'
})
export class GenerateStudentCertificateService {


  private baseAPiUrl = 'https://localhost:44350';

  constructor(private httpClient: HttpClient) { }

  getCurrentUser(): Observable<User> {
    return this.httpClient.get<User>(this.baseAPiUrl + '/api/user/');
  }

}
