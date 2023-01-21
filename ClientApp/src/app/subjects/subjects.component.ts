import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { StudentData } from 'app/models/api-models/studentData.model';
import { User } from 'app/models/api-models/user.model';
import { CurrentUser } from 'app/models/ui-models/currentUser.model';
import { SubjectStudents } from 'app/models/ui-models/subjectStudents';
import { AuthenticationService } from 'app/shared/services/authentication.service';
import { UsersService } from 'app/users/users.service';
import Swal from 'sweetalert2';
import { Subject } from '../models/api-models/subject.model';
import { SubjectsService } from './subjects.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  currentUser: CurrentUser;
  teachers: User[]
  newSubjectTeacherId: string;
  subjectToStudents: Map<number, SubjectStudents>
  studentsData: Map<string, StudentData>

  displayedStudents: User[]
  displayedSubject: Subject

  newSubject: Subject;
  subjects: Subject[] = [];

  createSubjectStarted: boolean;

  displayedColumns: string[] = ['Name', 'Teacher', 'YearOfTeaching', 'Semester','actions']
  dataSource: MatTableDataSource<Subject> = new MatTableDataSource<Subject>();

  displayedStudensColumns: string[] = ['Registration Number', 'Name', 'Class', 'Phone Number', 'Email']
  displayedStudentsDataSource: MatTableDataSource<User> = new MatTableDataSource<User>();

  @ViewChild(MatPaginator, { static: true }) matPaginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) matSort!: MatSort;
  filterString = '';
  constructor(private subjectService: SubjectsService,
    private authService: AuthenticationService,
    private userService: UsersService) { }

  async ngOnInit() {
    this.resetNewSubject();

    this.displayedStudents = undefined;
    this.currentUser = await this.authService.getCurrentUser().toPromise();
    this.teachers = await this.userService.GetTeachers().toPromise();
    this.subjectToStudents = await this.subjectService.GetSubjectsStudents().toPromise();
    this.studentsData = this.generateStudentIdToStudentDataMapping(await this.subjectService.GetStudentData().toPromise());
    this.newSubjectTeacherId = this.teachers[0].id;

    if(this.currentUser.role == "Admin"){
      this.subjects = await this.subjectService.GetAllSubjects().toPromise();
    } else{
      this.subjects = await this.subjectService.GetSubjectsByTeacherName().toPromise();
    }

    this.dataSource = new MatTableDataSource<Subject>(this.subjects);
    if (this.matPaginator) {
      this.dataSource.paginator = this.matPaginator;
    }

    if (this.matSort) {
      this.dataSource.sort = this.matSort;
    }
  }
   
  public addSubject(){
    this.newSubject.teacherId = this.newSubjectTeacherId;
    var teacher = this.teachers.find(teacher => teacher.id == this.newSubjectTeacherId)
    this.newSubject.teacherName = teacher.firstName + " " + teacher.lastName;

    if(this.newSubject.name.trim() === ""){
      Swal.fire({
        title: "Invalid course",
        text: "Please provide a name for the subject",
        icon: "error"
      })
    }

    this.subjectService.CreateSubject(this.newSubject).subscribe(
      _res => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Subject added successfuly",
          timer: 2000
        }).then(async _=>{
          this.resetNewSubject()
          this.subjectToStudents = await this.subjectService.GetSubjectsStudents().toPromise();
          if(this.currentUser.role == "Admin"){
            this.subjects = await this.subjectService.GetAllSubjects().toPromise();
          } else{
            this.subjects = await this.subjectService.GetSubjectsByTeacherName().toPromise();
          }
          this.dataSource = new MatTableDataSource<Subject>(this.subjects);
        })
      },
      _err => {
        Swal.fire({
          title: "Oops...",
          text: "Sorry there was an error...please try again later",
          icon: "error"
        })
      }
    )

  }  

  public deleteSubject(subject: Subject){
    Swal.fire({
      icon: "warning",
      text: `Are you sure you want to delete ${subject.name}?`,
      confirmButtonText: "Yes",
      confirmButtonColor: "green",
      showDenyButton: true,
      denyButtonText: "No",
    }).then(res=>{
      if(res.isConfirmed){
        this.subjectService.DeleteSubject(subject).subscribe(_res => {
          Swal.fire({
            icon: "success",
            title: "Succeess",
            text: "Subject deleted successfuly",
            showConfirmButton: false,
          }).then(async _=>{
            if(this.currentUser.role == "Admin"){
              this.subjects = await this.subjectService.GetAllSubjects().toPromise();
            } else{
              this.subjects = await this.subjectService.GetSubjectsByTeacherName().toPromise();
            }
            this.dataSource = new MatTableDataSource<Subject>(this.subjects);
          })
        }, _error => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong please try again later",
            showConfirmButton: false,
          })
        })
      }
    })
  }

  public resetNewSubject() {
    this.newSubject = {
      id: "0",
      name: "",
      semester: "1",
      yearOfTeaching: "1",
      teacherId: "",
      teacherName: ""
    }
  }
  
  public async addStudent(subject: Subject){
    
    var missingStudentsForSubject: User[] = this.subjectToStudents[Number(subject.id)].missingStudents;
    var idToName: Map<number, string>  = new Map<number, string>();

    missingStudentsForSubject.forEach(student => {
      idToName.set(Number(student.id), `${this.studentsData.get(student.id).class} ${student.firstName} ${student.lastName}`);
    })

    const selectedStudentId = await Swal.fire({
      title: 'Add students to a subject',
      input: 'select',
      inputOptions: idToName,
      inputPlaceholder: 'Select a student to add',
      showCancelButton: true
    })

    if(selectedStudentId.isConfirmed && selectedStudentId.value !== ''){
      this.subjectService.AddStudentToSubject(subject, selectedStudentId.value).subscribe(
        async _res =>{
          this.subjectToStudents = await this.subjectService.GetSubjectsStudents().toPromise();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `Student added to ${subject.name}`
        })
      
      }, _error => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong, please try again later"
        })
      }
      );}

  }

  public displaySubjectCreationForm(){
    this.createSubjectStarted = true;
  }

  public hideSubjectCreationForm(){
    this.createSubjectStarted = false;
    this.resetNewSubject();
  }

  public viewStudents(subject: Subject){
    this.displayedSubject = subject;
    this.displayedStudents = this.subjectToStudents[Number(subject.id)].enrolledStudents;
    this.displayedStudentsDataSource = new MatTableDataSource<User>(this.displayedStudents);
  }

  public hideStudents(){
    this.displayedStudents = undefined;
    this.displayedSubject = undefined;
  }

  public generateStudentIdToStudentDataMapping(studentData: StudentData[]): Map<string, StudentData>{
    var idToStudentDataMapping = new Map<string, StudentData>()

    studentData.forEach(sd => {
      idToStudentDataMapping.set(sd.userId, sd);
    })

    return idToStudentDataMapping;
  }

}
 
