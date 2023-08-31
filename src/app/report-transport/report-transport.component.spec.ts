import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTransportComponent } from './report-transport.component';

describe('ReportTransportComponent', () => {
  let component: ReportTransportComponent;
  let fixture: ComponentFixture<ReportTransportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportTransportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
