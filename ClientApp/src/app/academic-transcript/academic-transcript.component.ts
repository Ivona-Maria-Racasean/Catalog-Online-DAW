import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { CurrentUser } from 'app/models/ui-models/currentUser.model';
import { GradedSubject } from 'app/models/ui-models/transcript/gradedSubject.model';
import { Transcript } from 'app/models/ui-models/transcript/transcript.model';
import { AuthenticationService } from 'app/shared/services/authentication.service';
import { TranscriptService } from './transcript.service';

@Component({
  selector: 'app-academic-transcript',
  templateUrl: './academic-transcript.component.html',
  styleUrls: ['./academic-transcript.component.css']
})
export class AcademicTranscriptComponent implements OnInit {

  transcript: Transcript;
  currentUser: CurrentUser;

  selectedYear: string;
  orderingMethod: string;

  displayedColumns: string[] = ['Name', 'Semester', 'Teacher Name', 'Grade'];
  dataSource: MatTableDataSource<GradedSubject> = new MatTableDataSource<GradedSubject>();
  displayedSubjects: GradedSubject[]

  constructor(
    private transcriptService: TranscriptService, 
    private authService: AuthenticationService) { }

  async ngOnInit() {
    this.currentUser = await this.authService.getCurrentUser().toPromise()
    this.transcript = await this.transcriptService.GetTranscript().toPromise();
    this.selectedYear = "0"
    this.orderingMethod = "0"
  }

  yearChange(){
    this.orderingMethod = "0"
    switch(this.selectedYear){
      case "0":
        this.displayedSubjects = new Array<GradedSubject>();
        break;
      case "1":
        this.displayedSubjects = this.transcript.firstYearSubjects;
        break;
      case "2":
        this.displayedSubjects = this.transcript.secondYearSubjects;
        break;
      case "3":
        this.displayedSubjects = this.transcript.thirdYearSubjects;
        break;
      case "4":
        this.displayedSubjects = this.transcript.fourthYearSubjects;
        break;    
    }

    this.dataSource = new MatTableDataSource<GradedSubject>(this.displayedSubjects);
  }

  orderingChange(){
    var orderedSubjects: GradedSubject[] =  new Array<GradedSubject>();
    switch(this.orderingMethod){
      case "0":
        orderedSubjects = this.displayedSubjects;
        break;
      case "1":
        orderedSubjects = this.makeCopy(this.displayedSubjects);
        orderedSubjects.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        console.log("Order by name ascending")
        break;
      case "2":
        orderedSubjects = this.makeCopy(this.displayedSubjects);
        orderedSubjects.sort((a,b) => (a.name > b.name) ? -1 : ((b.name > a.name) ? 1 : 0));
        console.log("Order by name descending")
        break;
      case "3":
        orderedSubjects = this.makeCopy(this.displayedSubjects);
        orderedSubjects.sort((a,b) => a.grade - b.grade);
        console.log("Order by grade ascending")
        break;
      case "4":
        orderedSubjects = this.makeCopy(this.displayedSubjects);
        orderedSubjects.sort((a,b) => b.grade - a.grade);
        console.log("Order by grade descending")
        break;  
    }
    this.dataSource = new MatTableDataSource<GradedSubject>(orderedSubjects);
  }

  getGrade(grade: number){
    return grade != 0 ? grade : 'N/A'; 
  }

  makeCopy(obj: GradedSubject[]):GradedSubject[] {
    var newObj: GradedSubject[] = new Array<GradedSubject>();

    obj.forEach(gradedSubject => {
      newObj.push(gradedSubject);
    });

    return newObj;
  }

}
