import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { StudentData } from '../models/ui-models/studentData.model';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseAPiUrl ='https://localhost:44350';

  constructor(private httpClient: HttpClient) { }

  getStudent(): Observable<StudentData[]>{
    return this.httpClient.get<StudentData[]>(this.baseAPiUrl + '/api/user/StudentData');
  }


}
