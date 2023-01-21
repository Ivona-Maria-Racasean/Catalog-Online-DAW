import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/models/api-models/user.model';
import { StudentData } from 'app/models/ui-models/studentData.model';
import { SubjectStudents } from 'app/models/ui-models/subjectStudents';
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

  CreateSubject(subject: Subject){
    return this.httpClient.post(this.baseAPiUrl + '/api/subject', subject);
  }

  GetAllSubjects(){
    return this.httpClient.get<Subject[]>(this.baseAPiUrl + '/api/subject');
  }

  GetSubjectsStudents(){
    return this.httpClient.get<Map<number, SubjectStudents>>(this.baseAPiUrl + '/api/subject/subjectsAndUsers');
  }

  AddStudentToSubject(subject: Subject, studentId: string){
    return this.httpClient.post(this.baseAPiUrl + `/api/subject/addStudent/${studentId}`, subject);
  }

  DeleteSubject(subjectToBeDeleted: Subject){
    return this.httpClient.request('delete', this.baseAPiUrl + '/api/subject', {body: subjectToBeDeleted});
  }

  GetStudentData(): Observable<StudentData[]>{
    return this.httpClient.get<StudentData[]>(this.baseAPiUrl + '/api/user/StudentData');
  }

  RemoveStudent(studentId: string, subjectId: string){
    return this.httpClient.delete(this.baseAPiUrl + `/api/subject/removeStudent/${studentId}/${subjectId}`);
  }

}
