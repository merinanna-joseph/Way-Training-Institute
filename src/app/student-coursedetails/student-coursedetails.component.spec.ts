import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCoursedetailsComponent } from './student-coursedetails.component';

describe('StudentCoursedetailsComponent', () => {
  let component: StudentCoursedetailsComponent;
  let fixture: ComponentFixture<StudentCoursedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentCoursedetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCoursedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
