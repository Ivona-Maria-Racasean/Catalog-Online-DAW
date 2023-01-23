import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { CurrentUser } from 'app/models/ui-models/currentUser.model';
import { GradedSubject } from 'app/models/ui-models/transcript/gradedSubject.model';
import { Transcript } from 'app/models/ui-models/transcript/transcript.model';
import { AuthenticationService } from 'app/shared/services/authentication.service';
import jsPDF from 'jspdf';
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
  canGeneratePdf: boolean

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
    this.canGeneratePdf = this.canGenerateCertificatePDF();
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

  canGenerateCertificatePDF(): boolean{
    switch(Number(this.transcript.enrolmentData.yearOfStudying)){
      case 1:
        return this.transcript.firstYearSubjects.length != 0;
      case 2:
        return this.transcript.secondYearSubjects.length != 0;
      case 3:
        return this.transcript.thirdYearSubjects.length != 0;
      case 4:
        return this.transcript.fourthYearSubjects.length != 0;
    }
  }

  generateCertificate(){
    var doc = new jsPDF()
    doc.text(`Se acorda studentului ${this.currentUser.firstName} ${this.currentUser.lastName}, cu numarul de inregistrare ${this.transcript.enrolmentData.registrationNumber} in`, 20, 50);
    doc.text(`anul ${this.transcript.enrolmentData.yearOfStudying} de studiu, la grupa ${this.transcript.enrolmentData.class} cu scopul de a dovedi ca acesta este inscris la`, 8, 57);
    doc.text(`un program de studiu al Facultatii de Matematica Informatica.`, 8, 64)
    
    doc.text("Data:", 20, 90)
    doc.text(`${new Date().getDate()}.0${new Date().getMonth() + 1}.${new Date().getFullYear()}`, 20, 97)

    doc.setFontSize(10)
    doc.text("Facultatea de Matematica si Informatica", 8, 7)
    doc.text("Universitatea din Bucuresti", 150, 7)    



    doc.setFontSize(22)
    doc.text("Adeverinta de student", 65, 25)

    doc.save(`Adeverinta - ${this.currentUser.firstName} ${this.currentUser.lastName}`)
  }

}
