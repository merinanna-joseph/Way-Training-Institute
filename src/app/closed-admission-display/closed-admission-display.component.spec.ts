import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedAdmissionDisplayComponent } from './closed-admission-display.component';

describe('ClosedAdmissionDisplayComponent', () => {
  let component: ClosedAdmissionDisplayComponent;
  let fixture: ComponentFixture<ClosedAdmissionDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClosedAdmissionDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedAdmissionDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
