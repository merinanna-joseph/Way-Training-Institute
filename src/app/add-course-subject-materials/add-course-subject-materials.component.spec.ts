import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseSubjectMaterialsComponent } from './add-course-subject-materials.component';

describe('AddCourseSubjectMaterialsComponent', () => {
  let component: AddCourseSubjectMaterialsComponent;
  let fixture: ComponentFixture<AddCourseSubjectMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCourseSubjectMaterialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseSubjectMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
