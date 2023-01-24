import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import { StudentData } from '../models/ui-models/studentData.model';
import { CataloguesService } from './catalogues.service';

@Component({
  selector: 'app-catalogues',
  templateUrl: './catalogues.component.html',
  styleUrls: ['./catalogues.component.css']
})
export class CataloguesComponent implements OnInit {
  allStudents: StudentData[]
  displayedStudents: StudentData[] = []
  classes: String[]
  selectedClass: string
  subjects: String[]
  selectedSubject: string

  displayUnselectedDownloadError: boolean

  displayedColumns: string[] = ['yearOfStudying', 'registrationNumber','class', 'firstName', 'lastName', 'email', 'actions'];
  dataSource: MatTableDataSource<StudentData> = new MatTableDataSource<StudentData>();
  @ViewChild(MatPaginator, {static: true}) matPaginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) matSort!: MatSort;
  filterString = '';

  constructor(private cataloguesService: CataloguesService) { }

  ngOnInit(): void {
    // Fetch Students
    this.cataloguesService.getStudent()
      .subscribe(
        (successResponse) => {
          this.allStudents = successResponse;
          this.getAllClasses()
          this.getAllSubjects()

          if (this.matPaginator) {
            this.dataSource.paginator = this.matPaginator;
          }

          if (this.matSort) {
            this.dataSource.sort = this.matSort;
          }
        },
        (errorResponse) => {
          console.log(errorResponse);
        }
      );
  }

  filterStudents() {
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }

  getAllClasses(){
    this.selectedClass = "Choose class"
    var allClasses: Set<String> = new Set<String>();
    allClasses.add("Choose class")
    this.allStudents.forEach(student => {
      allClasses.add(student.class)
    })

    this.classes = Array.from(allClasses.values())
  }
  getAllSubjects(){
    this.selectedSubject = "Choose subject"
    var allSubjects: Set<String> = new Set<String>();
    allSubjects.add("Choose subject")

    this.allStudents.forEach(student => {
      student.subjects.forEach(subject => {
        allSubjects.add(subject)
      })
    })

    this.subjects = Array.from(allSubjects.values())
  }

  subjectChange(){
    this.selectedClass = "Choose class"
    this.displayedStudents = []
    this.allStudents.forEach(student => {
      if(student.subjects.includes(this.selectedSubject)){
        this.displayedStudents.push(student)
      }
    })
    this.dataSource = new MatTableDataSource<StudentData>(this.displayedStudents);
  }

  classChange(){
    this.selectedSubject = "Choose subject"
    this.displayedStudents = []

    this.allStudents.forEach(student => {
      if(student.class === this.selectedClass){
        this.displayedStudents.push(student)
      }
    })
    this.dataSource = new MatTableDataSource<StudentData>(this.displayedStudents);
  }

  SavePDF(){

    if(this.selectedClass === 'Choose class' && this.selectedSubject === 'Choose subject'){
      this.displayUnselectedDownloadError = true;
      return
    }

    this.displayUnselectedDownloadError = false;

    var doc = new jsPDF();

    var body = []
    this.displayedStudents.forEach(student =>{
      var studentInfo = []
      studentInfo.push(student.user.firstName + ' ' + student.user.lastName)
      studentInfo.push(student.registrationNumber)
      studentInfo.push(student.class)
      studentInfo.push(student.yearOfStudying)
      studentInfo.push(student.user.email)
      studentInfo.push(student.user.phoneNumber)

      body.push(studentInfo)
    })

    autoTable(doc, {
      head: [['Name', 'Registration Number', 'Class', 'Year Of Study', 'Email', 'Phone number']],
      body: body
    })


    if(this.selectedClass != 'Choose class'){
      doc.save(`Class ${this.selectedClass} - catalogue`)
    }

    if(this.selectedSubject != 'Choose subject'){
      doc.save(this.selectedSubject + ' catalogue')
    }

  }
}
