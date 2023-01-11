/// <reference path="../students/students.component.ts" />
import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as moment from 'moment';
import { StudentCertificate } from '../models/api-models/studentCertificate.model';
import { GenerateStudentCertificateService  } from './generate-student-certificate.service';
import { StudentData } from '../models/api-models/studentData.model';
import { User } from '../models/api-models/user.model';
import { StudentService } from '../students/student.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-generate-student-certificate',
  templateUrl: './generate-student-certificate.component.html',
  styleUrls: ['./generate-student-certificate.component.css']
})
export class GenerateStudentCertificateComponent implements OnInit {

  studentData: StudentData = null;
 // displayedColumns: string[] = ['firstName, lastName', 'yearOfStudying', 'class'];
  studentCertificate: StudentCertificate;
  //public nume = this.studentData.id;
  public numelemeu = "Ana-Maria";
  public currentDate = new Date();


  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    /*
    this.userService.
      .subscribe(
        (successResponse) => {
          this.user = successResponse;
        },
          (errorResponse) => {
            console.log(errorResponse);
          }
      );*/

  }


  getDocumentDefinition() {
    sessionStorage.setItem('studentCertificate', JSON.stringify(this.studentCertificate));
    return {
      content: [
        {
          columns: [
            [{
              text: 'Universitatea din Bucuresti'
            },
            {
              text: 'Facultatea de Matematica si Informatica'
            },
            {
              text: 'Str. Academiei, Nr. 14, Bucuresti, Romania'
            },
            ],
            [
              {
                text: 'Nr: ',
                alignment: 'right',
              },
              {
                text: 'Data: ' + moment(this.currentDate).format("DD.MM.YYYY") ,
                alignment: 'right',
              },
            ]
          ],
        },
        {
          text: 'ADEVERINTA',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 20, 0, 20]
        },
        {
          text: 'Studentul(a) ' + this.numelemeu + ' este inscris(a) in anul universitar curent in anul 4 de studii, domeniul CTI.',
          style: 'body'
        }],
      styles: {
        body: {
          fontSize: 12,
          margin: [30, 0, 0, 30]
        }
      }
    };
  }

  generatePdf() {
    const documentDefinition = this.getDocumentDefinition();
    pdfMake.createPdf(documentDefinition).open();
  }
}
