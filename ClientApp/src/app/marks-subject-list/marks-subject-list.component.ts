import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Mark } from '../models/api-models/mark.model';
import { SubjectsService } from '../subjects/subjects.service';
import { MarksSubjectListService } from './marks-subject-list.service';

@Component({
  selector: 'app-marks-subject-list',
  templateUrl: './marks-subject-list.component.html',
  styleUrls: ['./marks-subject-list.component.css']
})
export class MarksSubjectListComponent implements OnInit {

  marks: Mark[] = [];
  displayedColumns: string[] = ['LastName', 'FirstName', 'Value']
  dataSource: MatTableDataSource<Mark> = new MatTableDataSource<Mark>();
  @ViewChild(MatPaginator, { static: true }) matPaginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) matSort!: MatSort;
  filterString = '';
  constructor(private route: ActivatedRoute,
    private marksSubjectService: MarksSubjectListService) { }

  async ngOnInit() {
    this.route.queryParams.subscribe(async params => {
      let subjectId = params['subjectId'];
      //  let firstName = params['firstName']
      //  let lastName = params['lastName']
      //Fetch Subjects
      this.marks = await this.marksSubjectService.GetMarksByCurrentSubjectId(subjectId).toPromise();
      console.log(this.marks);
      this.dataSource = new MatTableDataSource<Mark>(this.marks);

      if (this.matPaginator) {
        this.dataSource.paginator = this.matPaginator;
      }

      if (this.matSort) {
        this.dataSource.sort = this.matSort;
      }
    }
    );

  }
}
