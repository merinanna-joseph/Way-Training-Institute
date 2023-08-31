import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffRequestComponent } from './staff-request.component';

describe('StaffRequestComponent', () => {
  let component: StaffRequestComponent;
  let fixture: ComponentFixture<StaffRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
