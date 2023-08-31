import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatemanagementComponent } from './candidatemanagement.component';

describe('CandidatemanagementComponent', () => {
  let component: CandidatemanagementComponent;
  let fixture: ComponentFixture<CandidatemanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatemanagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatemanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
