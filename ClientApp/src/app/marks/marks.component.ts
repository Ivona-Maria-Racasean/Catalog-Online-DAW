import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentData } from '../models/api-models/studentData.model';
import { Mark } from '../models/ui-models/mark.model';
import { MarkService } from './marks.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.css']
})
export class MarksComponent implements OnInit {

  marks: Mark[] = [];
  displayedColumns: string[] = ['subjectName', 'value', 'semester', 'yearOfTeaching', 'teacherName']
  dataSource: MatTableDataSource<Mark> = new MatTableDataSource<Mark>();
  @ViewChild(MatPaginator, { static: true }) matPaginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) matSort!: MatSort;
  filterString = '';

  constructor(private route: ActivatedRoute,
          private markService: MarkService) { }

  ngOnInit(): void {
    //Fetch Marks
    this.markService.getMarksByStudentId(+this.route.snapshot.params['id'])
    .subscribe(
      (successResponse) => {
        this.marks = successResponse;
        console.log(this.marks)
      })
  }
}
