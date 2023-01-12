import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mark } from '../models/api-models/mark.model';

@Injectable({
  providedIn: 'root'
})
export class MarksSubjectListService {
  
  private baseAPiUrl = 'https://localhost:44350';

  constructor(private httpClient: HttpClient) { }

  GetMarksByCurrentSubjectId(subjectId): Observable<Mark[]> {
    return this.httpClient.get< Mark[]>(this.baseAPiUrl + '/api/mark/marksSubject/'+subjectId)
  }
}
