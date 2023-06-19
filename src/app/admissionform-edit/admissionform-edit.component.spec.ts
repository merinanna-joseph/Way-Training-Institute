import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionformEditComponent } from './admissionform-edit.component';

describe('AdmissionformEditComponent', () => {
  let component: AdmissionformEditComponent;
  let fixture: ComponentFixture<AdmissionformEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmissionformEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionformEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
