import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAdmissionformdirectComponent } from './student-admissionformdirect.component';

describe('StudentAdmissionformdirectComponent', () => {
  let component: StudentAdmissionformdirectComponent;
  let fixture: ComponentFixture<StudentAdmissionformdirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAdmissionformdirectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAdmissionformdirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
