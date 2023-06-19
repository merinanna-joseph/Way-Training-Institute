import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBooklibraryViewComponent } from './student-booklibrary-view.component';

describe('StudentBooklibraryViewComponent', () => {
  let component: StudentBooklibraryViewComponent;
  let fixture: ComponentFixture<StudentBooklibraryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentBooklibraryViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentBooklibraryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
