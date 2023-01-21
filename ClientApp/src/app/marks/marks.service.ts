import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseMark } from 'app/models/ui-models/baseMark.model';
import { Observable } from 'rxjs';

import { Mark } from '../models/api-models/mark.model';

@Injectable({
  providedIn: 'root'
})
export class MarkService {

  private baseAPiUrl = 'https://localhost:44350';

  constructor(private httpClient: HttpClient) { }

  getMarksByStudentId(id): Observable<Mark[]> {
    return this.httpClient.get<Mark[]>(this.baseAPiUrl + '/api/mark/' + id)
  }

  getAllMarks() {
    return this.httpClient.get<BaseMark[]>(this.baseAPiUrl + '/api/mark/all')
  }

  addMark(mark: BaseMark){
    return this.httpClient.post<BaseMark>(this.baseAPiUrl + '/api/mark', mark);
  }

  removeMark(subjectId: string, studentId: string){
    return this.httpClient.delete(this.baseAPiUrl + `/api/mark/${subjectId}/${studentId}`);
  }

}
