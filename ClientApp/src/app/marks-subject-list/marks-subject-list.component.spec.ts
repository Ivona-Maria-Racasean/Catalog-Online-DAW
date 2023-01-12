import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarksSubjectListComponent } from './marks-subject-list.component';

describe('MarksSubjectListComponent', () => {
  let component: MarksSubjectListComponent;
  let fixture: ComponentFixture<MarksSubjectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarksSubjectListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarksSubjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
