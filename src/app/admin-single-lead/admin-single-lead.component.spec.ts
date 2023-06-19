import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSingleLeadComponent } from './admin-single-lead.component';

describe('AdminSingleLeadComponent', () => {
  let component: AdminSingleLeadComponent;
  let fixture: ComponentFixture<AdminSingleLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSingleLeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSingleLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
