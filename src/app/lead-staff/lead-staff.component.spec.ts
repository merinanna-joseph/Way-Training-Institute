import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadStaffComponent } from './lead-staff.component';

describe('LeadStaffComponent', () => {
  let component: LeadStaffComponent;
  let fixture: ComponentFixture<LeadStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
