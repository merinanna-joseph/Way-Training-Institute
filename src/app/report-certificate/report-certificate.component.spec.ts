import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCertificateComponent } from './report-certificate.component';

describe('ReportCertificateComponent', () => {
  let component: ReportCertificateComponent;
  let fixture: ComponentFixture<ReportCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCertificateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
