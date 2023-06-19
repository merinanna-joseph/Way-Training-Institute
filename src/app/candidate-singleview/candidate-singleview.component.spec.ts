import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateSingleviewComponent } from './candidate-singleview.component';

describe('CandidateSingleviewComponent', () => {
  let component: CandidateSingleviewComponent;
  let fixture: ComponentFixture<CandidateSingleviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateSingleviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateSingleviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
