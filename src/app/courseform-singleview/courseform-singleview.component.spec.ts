import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseformSingleviewComponent } from './courseform-singleview.component';

describe('CourseformSingleviewComponent', () => {
  let component: CourseformSingleviewComponent;
  let fixture: ComponentFixture<CourseformSingleviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseformSingleviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseformSingleviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
