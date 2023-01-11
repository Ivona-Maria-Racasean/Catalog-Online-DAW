import { TestBed } from '@angular/core/testing';

import { GenerateStudentCertificateService } from './generate-student-certificate.service';

describe('GenerateStudentCertificateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenerateStudentCertificateService = TestBed.get(GenerateStudentCertificateService);
    expect(service).toBeTruthy();
  });
});
