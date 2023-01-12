import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subject } from '../models/api-models/subject.model';
import { SubjectsService } from './subjects.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  subjects: Subject[] = [];
  displayedColumns: string[] = ['Name', 'YearOfTeaching', 'Semester','actions']
  dataSource: MatTableDataSource<Subject> = new MatTableDataSource<Subject>();
  @ViewChild(MatPaginator, { static: true }) matPaginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) matSort!: MatSort;
  filterString = '';
  constructor(private route: ActivatedRoute,
    private subjectService: SubjectsService) { }

  async ngOnInit() {
    //this.route.queryParams.subscribe(async params => {
    //  let firstName = params['firstName']
    //  let lastName = params['lastName']
      //Fetch Subjects
    this.subjects = await this.subjectService.GetSubjectsByTeacherName().toPromise();
    console.log(this.subjects);
      this.dataSource = new MatTableDataSource<Subject>(this.subjects);

      if (this.matPaginator) {
        this.dataSource.paginator = this.matPaginator;
      }

      if (this.matSort) {
        this.dataSource.sort = this.matSort;
      }
  }
  //);
  
}
