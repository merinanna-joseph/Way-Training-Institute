import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayBooklibraryComponent } from './display-booklibrary.component';

describe('DisplayBooklibraryComponent', () => {
  let component: DisplayBooklibraryComponent;
  let fixture: ComponentFixture<DisplayBooklibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayBooklibraryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayBooklibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
