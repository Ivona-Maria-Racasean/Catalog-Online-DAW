import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Teacher } from '../models/api-models/teacher.model';
import { TeachersService } from './teachers.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  teachers: Teacher[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'email'];
  dataSource: MatTableDataSource<Teacher> = new MatTableDataSource<Teacher>();
  @ViewChild(MatPaginator, { static: true }) matPaginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) matSort!: MatSort;
  filterString = '';

  constructor(private teachersService: TeachersService) { }

  ngOnInit(): void {

    // Fetch Students
    this.teachersService.getTeachers()
      .subscribe(
        (successResponse) => {
          this.teachers = successResponse;
          this.dataSource = new MatTableDataSource<Teacher>(this.teachers);

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

  filterTeachers() {
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }
}
