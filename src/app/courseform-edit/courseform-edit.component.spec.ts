import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseformEditComponent } from './courseform-edit.component';

describe('CourseformEditComponent', () => {
  let component: CourseformEditComponent;
  let fixture: ComponentFixture<CourseformEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseformEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseformEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
