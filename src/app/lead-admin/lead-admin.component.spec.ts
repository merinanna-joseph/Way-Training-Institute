import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadAdminComponent } from './lead-admin.component';

describe('LeadAdminComponent', () => {
  let component: LeadAdminComponent;
  let fixture: ComponentFixture<LeadAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
