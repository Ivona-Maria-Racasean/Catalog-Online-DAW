import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MarkService } from 'app/marks/marks.service';
import { StudentData } from 'app/models/api-models/studentData.model';
import { User } from 'app/models/api-models/user.model';
import { BaseMark } from 'app/models/ui-models/baseMark.model';
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
  studentsMarks: BaseMark[]

  searchByName: string;
  searchByTeacher: string;

  displayedStudents: User[]
  displayedStudentsMarks: Map<string, BaseMark> 
  displayedSubject: Subject

  newSubject: Subject;
  subjects: Subject[] = [];

  createSubjectStarted: boolean;

  displayedColumns: string[] = ['Name', 'Teacher', 'YearOfTeaching', 'Semester','actions']
  dataSource: MatTableDataSource<Subject> = new MatTableDataSource<Subject>();

  displayedStudensColumns: string[] = ['Registration Number', 'Name', 'Mark', 'Class', 'Phone Number', 'Email', 'Actions']
  displayedStudentsDataSource: MatTableDataSource<User> = new MatTableDataSource<User>();

  @ViewChild(MatPaginator, { static: true }) matPaginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) matSort!: MatSort;
  filterString = '';
  constructor(
    private subjectService: SubjectsService,
    private authService: AuthenticationService,
    private userService: UsersService,
    private markService: MarkService) { }

  async ngOnInit() {
    this.resetNewSubject();

    this.displayedStudents = undefined;
    this.currentUser = await this.authService.getCurrentUser().toPromise();
    this.teachers = await this.userService.GetTeachers().toPromise();
    this.subjectToStudents = await this.subjectService.GetSubjectsStudents().toPromise();
    this.studentsData = this.generateStudentIdToStudentDataMapping(await this.subjectService.GetStudentData().toPromise());
    this.studentsMarks = await this.markService.getAllMarks().toPromise();
    this.newSubjectTeacherId = this.teachers[0].id;

    if(this.currentUser.role == "Admin"){
      this.subjects = await this.subjectService.GetAllSubjects().toPromise();
    } else{
      this.subjects = await this.subjectService.GetSubjectsByTeacherName().toPromise();
      console.log(this.subjects)
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
          if(this.displayedSubject){
            this.viewStudents(this.displayedSubject)
          }
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

      this.displayedStudentsMarks = new Map<string, BaseMark>()
      var marksForDisplayedStudents = this.studentsMarks.filter(mark => mark.subjectId === Number(this.displayedSubject.id));
      marksForDisplayedStudents.forEach(studentMark => {
        this.displayedStudentsMarks.set(studentMark.userId.toString(), studentMark)
      });
  }

  public hideStudents(){
    this.displayedStudents = undefined;
    this.displayedSubject = undefined;
    this.displayedStudentsMarks = undefined;
  }

  public generateStudentIdToStudentDataMapping(studentData: StudentData[]): Map<string, StudentData>{
    var idToStudentDataMapping = new Map<string, StudentData>()

    studentData.forEach(sd => {
      idToStudentDataMapping.set(sd.userId, sd);
    })

    return idToStudentDataMapping;
  }

  public async removeStudent(student: User){
    const resp = await Swal.fire({
      icon: "question",
      text: `Are you sure you want to remove ${student.firstName} ${student.lastName} from ${this.displayedSubject.name} subject?`,
      confirmButtonColor: "green",
      confirmButtonText: "Yes",
      showDenyButton: true,
      denyButtonColor: "red",
      denyButtonText: "No"
    })

    if(resp.isDenied || resp.isDismissed){
      return
    }

    if(resp.isConfirmed){
      this.subjectService.RemoveStudent(student.id, this.displayedSubject.id).subscribe(
        async _res =>{
          this.subjectToStudents = await this.subjectService.GetSubjectsStudents().toPromise();
          this.studentsData = this.generateStudentIdToStudentDataMapping(await this.subjectService.GetStudentData().toPromise());
         this.viewStudents(this.displayedSubject)
          Swal.fire({
            icon: "success",
            title: "Success",
            text: `${student.firstName} ${student.lastName} removed from ${this.displayedSubject.name}`
          })
      }, 
      _err => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong, please try again later"
        })
      })
    }
  }

  public getStudentMark(student: User){
    var mark = this.displayedStudentsMarks.get(student.id.toString()).value
    return mark == 0 ? 'N/A' : mark; 
  }

  public async gradeStudent(student: User){
    const grade = await Swal.fire({
      icon: "question",
      text: `Add a grade to ${student.firstName} ${student.lastName} for ${this.displayedSubject.name} `,
      input: 'select',
      inputOptions: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10"
      },
      inputPlaceholder: 'Select a grade',
      showCancelButton: true
    });

    if(grade.isConfirmed && grade.value != ''){
      var mark = this.displayedStudentsMarks.get(student.id.toString());
      mark.value = grade.value;
      this.markService.addMark(mark).subscribe(async _res =>{
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: "Student was graded successfully!"
        })
        this.studentsMarks = await this.markService.getAllMarks().toPromise();
        this.viewStudents(this.displayedSubject);
        }, _error =>{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong, please try again later"
          })
        }
      )
    }

  }

  public async removeGrade(student: User){
    var res = await Swal.fire({
      icon: "warning",
      text: "Are you sure you want to remove the mark?",
      showDenyButton: true,
      confirmButtonColor: "green",
      confirmButtonText: "Yes",
      denyButtonColor: "red",
      denyButtonText: "No"
    })

    console.log(res)
    if(res.isConfirmed){
      this.markService.removeMark(this.displayedSubject.id, student.id).subscribe(
        async _res =>{
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: "Student was graded successfully!"
        })
        this.studentsMarks = await this.markService.getAllMarks().toPromise();
        this.viewStudents(this.displayedSubject);
      },_error =>{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong, please try again later"
        })
      })
    }

  }
  
  public notGraded(student: User): boolean{
    return this.displayedStudentsMarks.get(student.id.toString()).value == 0;
  }

  filterByName(){
    this.searchByTeacher = "";
    this.displayedStudents = undefined;
    this.displayedSubject = undefined;

    var filteredSubjects: Subject[] = this.subjects.filter(subject => subject.name.includes(this.searchByName)) 
    this.dataSource = new MatTableDataSource<Subject>(filteredSubjects);
  }

  filterByTeacher(){
    this.searchByName = ""
    this.displayedStudents = undefined;
    this.displayedSubject = undefined;

    var filteredSubjects: Subject[] = this.subjects.filter(subject => subject.teacherName.includes(this.searchByTeacher)) 
    this.dataSource = new MatTableDataSource<Subject>(filteredSubjects);
  }
}
 
