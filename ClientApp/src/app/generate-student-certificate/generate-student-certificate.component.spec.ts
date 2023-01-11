import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateStudentCertificateComponent } from './generate-student-certificate.component';

describe('GenerateStudentCertificateComponent', () => {
  let component: GenerateStudentCertificateComponent;
  let fixture: ComponentFixture<GenerateStudentCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateStudentCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateStudentCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
