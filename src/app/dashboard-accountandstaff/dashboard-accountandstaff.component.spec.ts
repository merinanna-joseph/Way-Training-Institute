import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAccountandstaffComponent } from './dashboard-accountandstaff.component';

describe('DashboardAccountandstaffComponent', () => {
  let component: DashboardAccountandstaffComponent;
  let fixture: ComponentFixture<DashboardAccountandstaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardAccountandstaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAccountandstaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
