import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from '../models/api-models/subject.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  private baseAPiUrl = 'https://localhost:44350';

  constructor(private httpClient: HttpClient) { }

  GetSubjectsByTeacherName(): Observable<Subject[]> {
    return this.httpClient.get<Subject[]>(this.baseAPiUrl + '/api/mark/subject/')
  }
}
