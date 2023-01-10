import { Component, OnInit,ViewChild  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentData } from '../models/ui-models/studentData.model';
import { StudentService } from './student.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: StudentData[] = [];
  displayedColumns: string[] = ['yearOfStudying', 'registrationNumber','class', 'firstName', 'lastName', 'email', 'actions'];
  dataSource: MatTableDataSource<StudentData> = new MatTableDataSource<StudentData>();
  @ViewChild(MatPaginator, {static: true}) matPaginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) matSort!: MatSort;
  filterString = '';

  constructor(private studentService: StudentService,
    private route: ActivatedRoute  ) { }

  ngOnInit(): void {
    // Fetch Students
    this.studentService.getStudent()
      .subscribe(
        (successResponse) => {
          this.students = successResponse;
          console.log(this.students)
          this.dataSource = new MatTableDataSource<StudentData>(this.students);

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

  onRowClick(studentData: StudentData) {
    this.route.snapshot.params.navigate(['marks']);
  }
}
