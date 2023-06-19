import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventsViewComponent } from './admin-events-view.component';

describe('AdminEventsViewComponent', () => {
  let component: AdminEventsViewComponent;
  let fixture: ComponentFixture<AdminEventsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEventsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEventsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
