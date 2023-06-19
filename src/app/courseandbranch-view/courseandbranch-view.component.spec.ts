import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseandbranchViewComponent } from './courseandbranch-view.component';

describe('CourseandbranchViewComponent', () => {
  let component: CourseandbranchViewComponent;
  let fixture: ComponentFixture<CourseandbranchViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseandbranchViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseandbranchViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
