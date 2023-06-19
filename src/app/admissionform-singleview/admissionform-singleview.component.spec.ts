import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionformSingleviewComponent } from './admissionform-singleview.component';

describe('AdmissionformSingleviewComponent', () => {
  let component: AdmissionformSingleviewComponent;
  let fixture: ComponentFixture<AdmissionformSingleviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmissionformSingleviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionformSingleviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
