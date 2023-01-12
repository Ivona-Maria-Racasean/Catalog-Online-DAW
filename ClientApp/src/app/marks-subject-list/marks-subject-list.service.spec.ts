import { TestBed } from '@angular/core/testing';

import { MarksSubjectListService } from './marks-subject-list.service';

describe('MarksSubjectListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MarksSubjectListService = TestBed.get(MarksSubjectListService);
    expect(service).toBeTruthy();
  });
});
