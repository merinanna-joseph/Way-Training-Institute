import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeecollectionformComponent } from './feecollectionform.component';

describe('FeecollectionformComponent', () => {
  let component: FeecollectionformComponent;
  let fixture: ComponentFixture<FeecollectionformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeecollectionformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeecollectionformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
