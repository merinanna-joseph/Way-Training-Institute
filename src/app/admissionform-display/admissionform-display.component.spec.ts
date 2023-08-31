import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionformDisplayComponent } from './admissionform-display.component';

describe('AdmissionformDisplayComponent', () => {
  let component: AdmissionformDisplayComponent;
  let fixture: ComponentFixture<AdmissionformDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmissionformDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionformDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
