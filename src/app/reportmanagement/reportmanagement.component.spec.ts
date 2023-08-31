import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportmanagementComponent } from './reportmanagement.component';

describe('ReportmanagementComponent', () => {
  let component: ReportmanagementComponent;
  let fixture: ComponentFixture<ReportmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportmanagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
