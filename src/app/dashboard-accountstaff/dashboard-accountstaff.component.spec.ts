import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAccountstaffComponent } from './dashboard-accountstaff.component';

describe('DashboardAccountstaffComponent', () => {
  let component: DashboardAccountstaffComponent;
  let fixture: ComponentFixture<DashboardAccountstaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardAccountstaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAccountstaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
