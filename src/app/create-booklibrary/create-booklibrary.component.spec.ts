import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBooklibraryComponent } from './create-booklibrary.component';

describe('CreateBooklibraryComponent', () => {
  let component: CreateBooklibraryComponent;
  let fixture: ComponentFixture<CreateBooklibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBooklibraryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBooklibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
