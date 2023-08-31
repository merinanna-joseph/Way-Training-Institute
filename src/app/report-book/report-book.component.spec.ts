import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportBookComponent } from './report-book.component';

describe('ReportBookComponent', () => {
  let component: ReportBookComponent;
  let fixture: ComponentFixture<ReportBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
