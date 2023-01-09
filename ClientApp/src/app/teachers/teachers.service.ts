import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from '../models/api-models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  private baseAPiUrl = 'https://localhost:44350';

  constructor(private httpClient: HttpClient) { }

  getTeachers(): Observable<Teacher[]> {
    return this.httpClient.get<Teacher[]>(this.baseAPiUrl + '/api/user/teachers');
  }
}
